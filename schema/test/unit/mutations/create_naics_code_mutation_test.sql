set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

-- Function exists
select has_function(
  'ggircs_portal', 'create_naics_code', array['text', 'text', 'text'],
  'Function ggircs_portal.create_naics_code should exist'
);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();

select ggircs_portal.create_naics_code('1234', 'sector', 'init');

select results_eq(
  $$
    select naics_description from ggircs_portal.naics_code where naics_code='1234';
  $$,
  array['init'::varchar(10000)],
  'Custom mutation creates a row if the NAICS code does not already exist'
);

-- "Delete" naics code & re-run custom mutation
update ggircs_portal.naics_code set deleted_at=now() where naics_code='1234';
select ggircs_portal.create_naics_code('1234', 'sector', 'updated');

select results_eq(
  $$
    select naics_description from ggircs_portal.naics_code where naics_code='1234';
  $$,
  array['updated'::varchar(1000)],
  'Custom mutation updates the description when the naics_code already exists'
);

select is_empty(
  $$
    select *  from ggircs_portal.naics_code where naics_code='1234' and deleted_at is not null;
  $$,
  'Custom mutation sets deleted_at to null when the naics_code already exists'
);

select finish();

rollback;
