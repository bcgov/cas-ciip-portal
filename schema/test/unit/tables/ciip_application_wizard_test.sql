set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

-- Table exists
select has_table(
  'ggircs_portal', 'ciip_application_wizard',
  'ggircs_portal.ciip_application_wizard should exist, and be a table'
);

-- Row level security tests --

-- Test setup
create role test_superuser superuser;
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

insert into ggircs_portal.form_json (id, name,slug,short_name,description,form_json,prepopulate_from_ciip,prepopulate_from_swrs) overriding system value
    values (999, 'test', 'test', 'test', 'test', '{}', true, true);
insert into ggircs_portal.form_json (id, name,slug,short_name,description,form_json,prepopulate_from_ciip,prepopulate_from_swrs) overriding system value
    values (1000, 'test', 'test', 'test', 'test', '{}', true, true);

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_application_wizard where form_id < 5;
  $$,
  ARRAY[4::bigint],
    'ciip_administrator can view all data in ciip_application_wizard table'
);

select lives_ok(
  $$
    insert into ggircs_portal.ciip_application_wizard (form_id, form_position) overriding system value
    values (999, 1000);
  $$,
    'ciip_administrator can insert data in ciip_application_wizard table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_application_wizard where form_position=1000;
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_application_wizard set form_position = 1001 where form_position=1000;
  $$,
    'ciip_administrator can change data in ciip_application_wizard table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_application_wizard where form_position=1001;
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_application_wizard where form_position=1001;
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_ciip_application_wizard'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_application_wizard where form_id < 5;
  $$,
  ARRAY[4::bigint],
    'Industry User can view all data in ciip_application_wizard table'
);

select throws_like(
  $$
    insert into ggircs_portal.ciip_application_wizard (form_id, form_position) overriding system value
    values (1000, 1002);
  $$,
  'permission denied%',
    'Industry User cannot insert into table_ciip_application_wizard'
);

select throws_like(
  $$
    update ggircs_portal.ciip_application_wizard set form_position = 1000 where form_id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_ciip_application_wizard'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_application_wizard where form_id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_ciip_application_wizard'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_application_wizard where form_id < 5;
  $$,
  ARRAY[4::bigint],
    'ciip_analyst can view all data in ciip_application_wizard table'
);

select throws_like(
  $$
    insert into ggircs_portal.ciip_application_wizard (form_id, form_position) overriding system value
    values (1000, 1002);
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_ciip_application_wizard'
);

select throws_like(
  $$
    update ggircs_portal.ciip_application_wizard set form_position=1001 where form_id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_ciip_application_wizard'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_application_wizard where form_id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_ciip_application_wizard'
);

select finish();
rollback;
