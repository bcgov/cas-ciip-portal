set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(3);

-- Setup

truncate ggircs_portal.application restart identity cascade;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

-- Set time where application is open, reporting year 2019
select mocks.set_mocked_time_in_transaction('2020-07-03 00:00:00.000000-07'::timestamptz);

select ggircs_portal.create_application_mutation_chain(1);
update ggircs_portal.form_result
  set form_result = '[{"comments": "abc", "fuelRowId": 1, "quantity": 1, "fuelUnits": "kl", "emissionCategoryRowId": 1}]'
  where application_id=1 and version_number=1;

-- 2018 data
insert into ggircs_portal.application(facility_id, reporting_year) values (2, 2018);
insert into ggircs_portal.application_revision(application_id, version_number) values (2,1);
insert into ggircs_portal.form_json(name, slug, short_name, description, form_json, prepopulate_from_ciip, prepopulate_from_swrs)
values ('2018fuel', 'fuel-2018', 'fuel', 'fuel', '{}', false, false);
insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
values (
  2,
  1,
  (select id from ggircs_portal.form_json order by id desc limit 1),
  '[{"comments": "abc", "fuelType": "type", "fuelTypeAlt": "typealt", "fuelDescription": "desc", "quantity": 1, "fuelUnits": "kl", "associatedEmissions": 1}]'
);

-- Begin tests

select has_view('ggircs_portal', 'ciip_fuel', 'There is a ciip_fuel view');

select results_eq(
  $$
    select application_id, fuel_id, fuel_units, quantity, emission_category_id from ggircs_portal.ciip_fuel where application_id =1
  $$,
  $$
    select '1'::integer, '1'::integer, 'kl'::varchar, '1'::numeric, '1'::numeric
  $$,
  'ciip_fuel view returns the correct fuel data for current schema'
);

select results_eq(
  $$
    select application_id, fuel_type, fuel_type_alt, quantity, fuel_units, associated_emissions from ggircs_portal.ciip_fuel where application_id = 2
  $$,
  $$
    select '2'::integer, 'type'::varchar, 'typealt'::varchar, '1'::numeric, 'kl'::varchar, '1'::numeric
  $$,
  'ciip_fuel view returns the correct fuel data for the 2018 schema'
);

select finish();

rollback;
