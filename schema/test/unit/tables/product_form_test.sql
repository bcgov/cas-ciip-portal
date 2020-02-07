set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'product_form',
  'ggircs_portal.product_form should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.product_form where id < 5;
  $$,
  ARRAY[4::bigint],
    'ciip_administrator can view all data in product_form table'
);

select lives_ok(
  $$
    insert into ggircs_portal.product_form (id, product_form_description, product_form_schema) overriding system value
    values (1000, 'admin created', '{}');
  $$,
    'ciip_administrator can insert data in product_form table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.product_form where product_form_description='admin created'
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.product_form set product_form_description='admin changed' where id=1000;
  $$,
    'ciip_administrator can change data in product_form table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.product_form where product_form_description='admin changed'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.product_form where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_product_form'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.product_form where id < 5;
  $$,
  ARRAY[4::bigint],
    'Industry User can view all data in product_form table'
);

select throws_like(
  $$
    insert into ggircs_portal.product_form (id, product_form_description, product_form_schema) overriding system value
    values (1001, 'denied', '{}');
  $$,
  'permission denied%',
    'Industry User cannot insert into table_product_form'
);

select throws_like(
  $$
    update ggircs_portal.product_form set product_form_description='denied' where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_product_form'
);

select throws_like(
  $$
    delete from ggircs_portal.product_form where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_product_form'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.product_form where id < 5;
  $$,
  ARRAY[4::bigint],
    'ciip_analyst can view all data in product_form table'
);

select throws_like(
  $$
    insert into ggircs_portal.product_form (id, product_form_description, product_form_schema) overriding system value
    values (1001, 'denied', '{}');
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_product_form'
);

select throws_like(
  $$
    update ggircs_portal.product_form set product_form_description='denied' where id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_product_form'
);

select throws_like(
  $$
    delete from ggircs_portal.product_form where id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_product_form'
);

select finish();
rollback;
