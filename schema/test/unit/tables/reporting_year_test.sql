set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'reporting_year',
  'ggircs_portal.reporting_year should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.reporting_year where reporting_year < 2022;
  $$,
  ARRAY[4::bigint],
    'ciip_administrator can view all data in reporting_year table'
);

select lives_ok(
  $$
    insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, application_open_time, application_close_time, application_response_time) overriding system value
    values (3000, now(), now(), now(), now(), now());
  $$,
    'ciip_administrator can insert data in reporting_year table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.reporting_year where reporting_year=3000
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.reporting_year set reporting_period_end='2000-01-01 23:00:00-08' where reporting_year=3000;
  $$,
    'ciip_administrator can change data in reporting_year table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.reporting_year where reporting_period_end='2000-01-01 23:00:00-08'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.reporting_year where reporting_year=3000
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_emission_category_gas'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.reporting_year where reporting_year < 2022;
  $$,
  ARRAY[4::bigint],
    'Industry User can view all data in reporting_year table'
);

select throws_like(
  $$
    insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, application_open_time, application_close_time, application_response_time) overriding system value
    values (1001, now(), now(), now(), now(), now());
  $$,
  'permission denied%',
    'Industry User cannot insert into table_emission_category_gas'
);

select throws_like(
  $$
    update ggircs_portal.reporting_year set reporting_period_end='1000-01-01 23:00:00-08' where reporting_year=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_emission_category_gas'
);

select throws_like(
  $$
    delete from ggircs_portal.reporting_year where reporting_year=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_emission_category_gas'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.reporting_year where reporting_year < 2022;
  $$,
  ARRAY[4::bigint],
    'ciip_analyst can view all data in reporting_year table'
);

select throws_like(
  $$
    insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, application_open_time, application_close_time, application_response_time) overriding system value
    values (1001, now(), now(), now(), now(), now());
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_emission_category_gas'
);

select throws_like(
  $$
    update ggircs_portal.reporting_year set reporting_period_end='1000-01-01 23:00:00-08' where reporting_year=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_emission_category_gas'
);

select throws_like(
  $$
    delete from ggircs_portal.reporting_year where reporting_year=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_emission_category_gas'
);

select finish();
rollback;
