set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(5);

-- Setup

select test_helper.modify_triggers('disable');
truncate ggircs_portal.application restart identity cascade;

-- Set time where application is open
select mocks.set_mocked_time_in_transaction('2020-07-03 00:00:00.000000-07'::timestamptz);

-- We create 3 applications: one submitted rev 1 (id=1), one submitted rev 2 and draft rev 3 (id=2), and one draft rev 1 (id=3)
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
select ggircs_portal.create_application_mutation_chain(3);

select ggircs_portal.create_application_revision_mutation_chain(2, 1);
update ggircs_portal.application_revision_status set application_revision_status='submitted';
select ggircs_portal.create_application_revision_mutation_chain(2, 2);

update ggircs_portal.form_result
set form_result = json_build_array(
  jsonb_build_object(
    'productRowId', 10,
    'productUnits', 'tonnes of cement equivalent',
    'productAmount', 5000,
    'productEmissions', 800
  ),
  jsonb_build_object(
    'productRowId', 8,
    'productAmount', 100,
    'productEmissions', 3000
  )
)
where application_id=1 and version_number=1
  and form_id = (select id from ggircs_portal.form_json where slug = 'production');

update ggircs_portal.form_result
set form_result = json_build_array(
  jsonb_build_object(
    'productRowId', 10,
    'productUnits', 'tonnes of cement equivalent',
    'productAmount', 0,
    'productEmissions', 0
  )
)
where application_id=2 and version_number > 0
  and form_id = (select id from ggircs_portal.form_json where slug = 'production');


update ggircs_portal.form_result
set form_result = json_build_array(
  jsonb_build_object(
    'quantity', 123,
    'fuelRowId', 5,
    'fuelUnits', 'kL',
    'emissionCategoryRowId', 1
  )
)
where application_id=1 and version_number = 1
  and form_id = (select id from ggircs_portal.form_json where slug = 'fuel');

update ggircs_portal.form_result
set form_result = '[]'
where application_id=2 and version_number > 0
  and form_id = (select id from ggircs_portal.form_json where slug = 'fuel');

update ggircs_portal.form_result
set form_result = '
{
  "sourceTypes": [
    {
      "gases": [
        {
          "gwp": 1,
          "gasType": "CO2nonbio",
          "annualCO2e": 5100,
          "annualEmission": 5100,
          "gasDescription": "Carbon dioxide from non-biomass"
        }
      ],
      "sourceTypeName": "General Stationary Combustion"
    }
  ]
}
'
where application_id=1 and version_number = 1
  and form_id = (select id from ggircs_portal.form_json where slug = 'emission');

update ggircs_portal.form_result
set form_result = '
{
  "sourceTypes": [
    {
      "gases": [
        {
          "gwp": 1,
          "gasType": "CO2nonbio",
          "annualCO2e": 0,
          "annualEmission": 0,
          "gasDescription": "Carbon dioxide from non-biomass"
        }
      ],
      "sourceTypeName": "General Stationary Combustion"
    }
  ]
}
'
where application_id=2 and version_number > 0
  and form_id = (select id from ggircs_portal.form_json where slug = 'emission');


-- Begin tests

select has_view('ggircs_portal', 'ciip_incentive_per_facility', 'There is a ciip_incentive_per_facility view');

-- does not select non-submitted applications
select results_eq(
  $$
    select application_id from ggircs_portal.ciip_incentive_per_facility;
  $$,
  $$
    values (1),(2)
  $$,
  'ciip_incentive_per_facility does not return non-submitted applications'
);

-- selects the last available submitted version of an application

select results_eq(
  $$
    select application_id, version_number from ggircs_portal.ciip_incentive_per_facility;
  $$,
  $$
    values (1,1), (2,2)
  $$,
  'ciip_incentive_per_facility only contains the last available submitted version'
);

-- returns 0 if the incentive is 0
select results_eq(
  $$
    select
      calculated_incentive,
      maximum_incentive,
      incentive_ratio
    from ggircs_portal.ciip_incentive_per_facility where application_id = 2;
  $$,
  $$
    values (0.0, 0.0, 0.0)
  $$,
  'ciip_incentive_per_facility returns 0 if the incentive is 0'
);

-- returns all fields and properly aggregated values
select results_eq(
  $$
    select
      application_id,
      version_number,
      reporting_year,
      facility_id,
      facility_name,
      operator_id,
      operator_name,
      round(calculated_incentive,2),
      round(maximum_incentive,2),
      round(incentive_ratio,4)
    from ggircs_portal.ciip_incentive_per_facility where application_id = 1;
  $$,
  $$
    values (
      1,
      1,
      2019,
      1,
      'Ftavhrcsu'::varchar,
      8,
      'Nckgmvysf, Inc.'::varchar,
      2853.81,
      3025.80,
      0.9432
    )
  $$,
  'ciip_incentive_per_facility returns all fields and accurate values'
);

select finish();

rollback;
