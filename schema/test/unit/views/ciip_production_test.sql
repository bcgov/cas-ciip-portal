set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

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
  set form_result = '[{"productRowId": 1, "requiresEmissionAllocation": "false", "productAmount": 5}]'
  where application_id=1 and version_number=1;

-- 2018 data
insert into ggircs_portal.application(facility_id, reporting_year) values (2, 2018);
insert into ggircs_portal.application_revision(application_id, version_number) values (2,1);
insert into ggircs_portal.form_json(name, slug, short_name, description, form_json, prepopulate_from_ciip, prepopulate_from_swrs)
values ('2018production', 'production-2018', 'production', 'production', '{}', false, false);
insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
values (
  2,
  1,
  (select id from ggircs_portal.form_json order by id desc limit 1),
  '[{"productName": "2018product", "quantity": 1, "units": "kl"}]'
);

-- Begin tests

select has_view('ggircs_portal', 'ciip_production', 'There is a ciip_production view');

select results_eq(
  $$
    select application_id, product_id, requires_emission_allocation, product_amount from ggircs_portal.ciip_production where application_id=1 and version_number=1
  $$,
  $$
    select '1'::integer, '1'::integer, 'false'::boolean, '5'::numeric
  $$,
  'ciip_production view returns the correct production data for current schema'
);

select results_eq(
  $$
    select application_id, product_name, product_amount, product_units from ggircs_portal.ciip_production where application_id = 2 and version_number=1
  $$,
  $$
    select '2'::integer, '2018product'::varchar, '1'::numeric, 'kl'::varchar
  $$,
  'ciip_production view returns the correct production data for the 2018 schema'
);

select finish();

rollback;
