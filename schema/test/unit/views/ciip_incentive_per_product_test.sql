set client_min_messages to warning;
create extension if not exists pgtap;

begin;

select plan(5);

-- Setup

select test_helper.modify_triggers('disable');
truncate ggircs_portal.application restart identity cascade;
reset client_min_messages;

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

select has_view('ggircs_portal', 'ciip_incentive_per_product', 'There is a ciip_incentive_per_product view');

-- does not select non-submitted applications
select results_eq(
  $$
    select application_id from ggircs_portal.ciip_incentive_per_product;
  $$,
  $$
    values (1),(1),(2)
  $$,
  'ciip_incentive_per_product does not return non-submitted applications'
);

-- selects the last available submitted version of an application

select results_eq(
  $$
    select application_id, version_number from ggircs_portal.ciip_incentive_per_product;
  $$,
  $$
    values (1,1), (1,1), (2,2)
  $$,
  'ciip_incentive_per_product only contains the last available submitted version'
);

-- returns 0 if the incentive is 0
select results_eq(
  $$
    select
      incentive_product,
      incentive_product_max,
      incentive_ratio
    from ggircs_portal.ciip_incentive_per_product where application_id = 2;
  $$,
  $$
    values (0.0, 0.0, 0.0)
  $$,
  'ciip_incentive_per_product returns 0 if the incentive is 0'
);

-- returns all fields and properly aggregated values
select results_eq(
  $$
    select
      application_id, version_number, product_id, product_name,
      product_amount, product_emissions, incentive_multiplier, round(payment_allocation_factor,2),
      round(incremental_carbon_tax,2), round(emission_intensity,2), benchmark, eligibility_threshold,
      round(incentive_product,2),
      round(incentive_product_max,2),
      round(incentive_ratio, 4)
    from ggircs_portal.ciip_incentive_per_product where application_id = 1;
  $$,
  $$
    values
    (
      1, 1, 8, 'Aluminum Smelting'::varchar(1000),
      100., 3000., 1., 0.79,
      3025.80, 30.00, 42., 84.,
      2388.79, 2388.79, 1.0000
    ),
    (
      1, 1, 10, 'Cement equivalent'::varchar(1000),
      5000., 800., 1., 0.21,
      3025.80, 0.16, 0.048, 0.46,
      463.84, 637.01, 0.7282
    )
  $$,
  'ciip_incentive_per_product returns all fields and accurate values'
);

select finish();

rollback;
