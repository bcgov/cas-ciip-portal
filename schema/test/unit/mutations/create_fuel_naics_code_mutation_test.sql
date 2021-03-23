set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

-- Function exists
select has_function(
  'ggircs_portal', 'create_fuel_naics_code', array['int', 'int'],
  'Function ggircs_portal.create_fuel_naics_code should exist'
);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
insert into ggircs_portal.fuel(name, swrs_fuel_mapping_id) values ('fuel 1', 1), ('fuel 2', 2);
insert into ggircs_portal.naics_code(naics_code, naics_description) values ('1234', 'naics 1'), ('9999', 'naics 2');

select ggircs_portal.create_fuel_naics_code(1, 1);

select results_eq(
  $$
    select fuel_id from ggircs_portal.fuel_naics_code;
  $$,
  array[1::integer],
  'Custom mutation creates a row if the fuel_naics_code code does not already exist'
);

-- "Delete" fuel_naics_code code & re-run custom mutation
update ggircs_portal.fuel_naics_code set deleted_at=now();
select ggircs_portal.create_fuel_naics_code(1, 1);

select is_empty(
  $$
    select *  from ggircs_portal.fuel_naics_code where deleted_at is not null;
  $$,
  'Custom mutation sets deleted_at to null when the fuel_naics_code_code already exists'
);

select finish();

rollback;
