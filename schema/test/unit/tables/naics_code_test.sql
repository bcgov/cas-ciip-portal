set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(17);

-- Table exists
select has_table(
  'ggircs_portal', 'naics_code',
  'ggircs_portal.naics_code should exist, and be a table'
);

select has_index(
  'ggircs_portal', 'naics_code', 'naics_naics_code_uindex',
  'naics table has a unique index on the naics_code column'
);

select is(
  (select count(*) from ggircs_portal.naics_code),
  29::bigint,
  'The naics table was seeded with 29 naics codes'
);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
insert into ggircs_portal.naics_code(naics_code, naics_description) values (1234, 'init');

-- Row level security tests --

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select naics_code from ggircs_portal.naics_code;
  $$,
  ARRAY[1234::varchar(1000)],
    'ciip_administrator can select data from the naics table'
);

select lives_ok(
  $$
    insert into ggircs_portal.naics_code (naics_code, naics_description)
    values (1001, 'admin created');
  $$,
    'ciip_administrator can insert data in naics table'
);

select results_eq(
  $$
    select naics_description from ggircs_portal.naics_code where naics_code='1001';
  $$,
    ARRAY['admin created'::varchar(10000)],
    'Data was inserted by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.naics_code set naics_description='admin updated';
  $$,
    'ciip_administrator can change data in naics table'
);

select results_eq(
  $$
    select naics_description from ggircs_portal.naics_code where naics_code='1001';
  $$,
    ARRAY['admin updated'::varchar(10000)],
    'Data was updated by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.naics_code;
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_naics'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select naics_code from ggircs_portal.naics_code where naics_code='1234';
  $$,
  ARRAY[1234::varchar(1000)],
    'Industry user can view data from naics'
);

select throws_like(
  $$
    insert into ggircs_portal.naics_code(naics_code, naics_description) values (999, 'user created');
  $$,
  'permission denied%',
    'Industry User cannot insert into ggircs_portal.naics_code'
);

select throws_like(
  $$
    update ggircs_portal.naics_code set naics_description='user changed' where naics_code='1234';
  $$,
  'permission denied%',
    'Industry User cannot update ggircs_portal.naics_code'
);

select throws_like(
  $$
    delete from ggircs_portal.naics_code;
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_naics'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select naics_code from ggircs_portal.naics_code where naics_code='1234';
  $$,
  ARRAY[1234::varchar(1000)],
  'Analyst can select from table naics'
);

select throws_like(
  $$
    insert into ggircs_portal.naics_code(naics_code, naics_description) values (999, 'user created');
  $$,
  'permission denied%',
    'Analyst cannot insert into ggircs_portal.naics_code'
);

select throws_like(
  $$
    update ggircs_portal.naics_code set naics_description='user changed' where naics_code='1234';
  $$,
  'permission denied%',
    'Analyst cannot update ggircs_portal.naics_code'
);

select throws_like(
  $$
    delete from ggircs_portal.naics_code;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table_naics'
);

select finish();
rollback;
