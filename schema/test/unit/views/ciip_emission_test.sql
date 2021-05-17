set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(3);

-- Setup

truncate ggircs_portal.application restart identity cascade;

-- Set time where application is open, reporting year 2019
select mocks.set_mocked_time_in_transaction('2020-07-03 00:00:00.000000-07'::timestamptz);

select ggircs_portal.create_application_mutation_chain(1);
update ggircs_portal.form_result
  set form_result = '{"sourceTypes": [{"gases": [{"gasType": "2019type", "annualEmission": 1, "gwp":1}], "sourceTypeName": "2019source"}]}'
  where application_id=1 and version_number=1;

-- 2018 data
insert into ggircs_portal.application(facility_id, reporting_year) values (2, 2018);
insert into ggircs_portal.application_revision(application_id, version_number) values (2,1);
insert into ggircs_portal.form_json(name, slug, short_name, description, form_json, prepopulate_from_ciip, prepopulate_from_swrs)
values ('2018emission', 'emission-2018', 'emission', 'emission', '{}', false, false);
insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
values (
  2,
  1,
  (select id from ggircs_portal.form_json order by id desc limit 1),
  '{"sourceTypes": [{"gases": [{"gasType": "2018type", "annualEmission": 1, "gwp":1}], "sourceTypeName": "2018source"}]}'
);

-- Begin tests

select has_view('ggircs_portal', 'ciip_emission', 'There is a ciip_emission view');

select results_eq(
  $$
    select application_id, source_type_name, gas_type, gwp from ggircs_portal.ciip_emission where application_id = 1 and version_number = 1
  $$,
  $$
    select '1'::integer, '2019source'::varchar, '2019type'::varchar, '1'::numeric
  $$,
  'ciip_emission view returns the correct emission data for current schema'
);

select results_eq(
  $$
    select application_id, source_type_name, gas_type, gwp from ggircs_portal.ciip_emission where application_id = 2 and version_number = 1
  $$,
  $$
    select '2'::integer, '2018source'::varchar, '2018type'::varchar, '1'::numeric
  $$,
  'ciip_emission view returns the correct emission data for the 2018 schema'
);

select finish();

rollback;
