set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

-- Function exists
select has_function(
  'ggircs_portal', 'create_product_naics_mutation', array['int', 'int', 'boolean'],
  'Function ggircs_portal.create_product_naics_mutation should exist'
);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
insert into ggircs_portal.product(product_name, product_state) values ('product 1', 'published'), ('product 2', 'published');
insert into ggircs_portal.naics(naics_code, naics_description) values ('1234', 'naics 1'), ('9999', 'naics 2');

select ggircs_portal.create_product_naics_mutation(1, 1, false);

select results_eq(
  $$
    select product_id from ggircs_portal.product_naics;
  $$,
  array[1::integer],
  'Custom mutation creates a row if the product_naics code does not already exist'
);

-- "Delete" product_naics code & re-run custom mutation
update ggircs_portal.product_naics set deleted_at=now();
select ggircs_portal.create_product_naics_mutation(1, 1, true);

select results_eq(
  $$
    select is_mandatory from ggircs_portal.product_naics where product_id=1;
  $$,
  array['true'::boolean],
  'Custom mutation updates the is_mandatory field when the naics_code already exists'
);

select is_empty(
  $$
    select *  from ggircs_portal.product_naics where deleted_at is not null;
  $$,
  'Custom mutation sets deleted_at to null when the product_naics_code already exists'
);

select finish();

rollback;
