set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(17);

-- Table exists
select has_table(
  'ggircs_portal', 'incremental_fuel_charge_baseline',
  'ggircs_portal.incremental_fuel_charge_baseline should exist, and be a table'
);

select has_index(
    'ggircs_portal', 'incremental_fuel_charge_baseline', 'fuel_charge_baseline_ct_act_fuel_type_fkey',
    'Foreign key carbon_tax_act_fuel_type_id is indexed'
);

select columns_are('ggircs_portal'::name, 'incremental_fuel_charge_baseline'::name, array[
    'id'::name,
    'carbon_tax_act_fuel_type_id'::name,
    'start_reporting_period'::name,
    'end_reporting_period'::name,
    'fuel_charge_baseline'::name,
    'comment'::name,
    'created_at'::name,
    'created_by'::name,
    'updated_at'::name,
    'updated_by'::name,
    'deleted_at'::name,
    'deleted_by'::name
]);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
insert into ggircs_portal.reporting_year (reporting_year,
    reporting_period_start,
    reporting_period_end,
    swrs_deadline,
    application_open_time,
    application_close_time
) values
    (2020, '2020-01-01', '2020-12-31', '2020-12-31', '2020-01-01', '2020-12-31'),
    (2021, '2021-01-01', '2021-12-31', '2021-12-31', '2021-01-01', '2021-12-31');

insert into ggircs_portal.incremental_fuel_charge_baseline(
  carbon_tax_act_fuel_type_id,
  start_reporting_period,
  end_reporting_period,
  fuel_charge_baseline
) values (1, 2020, 2021, 1.0);

-- Row level security tests --

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select fuel_charge_baseline from ggircs_portal.incremental_fuel_charge_baseline where id = 1;
  $$,
  ARRAY[1.0::numeric],
    'ciip_administrator can select data from the incremental_fuel_charge_baseline table'
);

select lives_ok(
  $$
    insert into ggircs_portal.incremental_fuel_charge_baseline(carbon_tax_act_fuel_type_id, start_reporting_period, end_reporting_period, fuel_charge_baseline)
    values (2, 2020, 2021, 2.0);

  $$,
    'ciip_administrator can insert data in the incremental_fuel_charge_baseline table'
);

select results_eq(
  $$
    select fuel_charge_baseline from ggircs_portal.incremental_fuel_charge_baseline where id = 2;
  $$,
    ARRAY[2.0::numeric],
    'Data was inserted by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 2.5 where id = 2;
  $$,
    'ciip_administrator can change data in the incremental_fuel_charge_baseline table'
);

select results_eq(
  $$
    select fuel_charge_baseline from ggircs_portal.incremental_fuel_charge_baseline where id = 2;
  $$,
  ARRAY[2.5::numeric],
  'Data was updated by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.incremental_fuel_charge_baseline;
  $$,
  'permission denied%',
    'Administrator cannot delete rows from the incremental_fuel_charge_baseline table'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select fuel_charge_baseline from ggircs_portal.incremental_fuel_charge_baseline where id = 1;
  $$,
  ARRAY[1.0::numeric],
  'Industry user can view data from the incremental_fuel_charge_baseline table'
);

select throws_like(
  $$
    insert into ggircs_portal.incremental_fuel_charge_baseline(carbon_tax_act_fuel_type_id, start_reporting_period, end_reporting_period, fuel_charge_baseline)
    values (3, 2020, 2021, 3.0);
  $$,
  'permission denied%',
  'Industry User cannot insert into ggircs_portal.incremental_fuel_charge_baseline'
);

select throws_like(
  $$
    update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 2.9 where id = 2;
  $$,
  'permission denied%',
  'Industry User cannot update ggircs_portal.incremental_fuel_charge_baseline'
);

select throws_like(
  $$
    delete from ggircs_portal.incremental_fuel_charge_baseline;
  $$,
  'permission denied%',
  'Industry User cannot delete rows from the incremental_fuel_charge_baseline table'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select fuel_charge_baseline from ggircs_portal.incremental_fuel_charge_baseline where id = 1;
  $$,
  ARRAY[1.0::numeric],
  'Analyst can select from the incremental_fuel_charge_baseline table'
);

select throws_like(
  $$
    insert into ggircs_portal.incremental_fuel_charge_baseline(carbon_tax_act_fuel_type_id, start_reporting_period, end_reporting_period, fuel_charge_baseline)
    values (3, 2020, 2021, 3.0);
  $$,
  'permission denied%',
    'Analyst cannot insert into ggircs_portal.incremental_fuel_charge_baseline'
);

select throws_like(
  $$
    update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 2.9 where id = 2;
  $$,
  'permission denied%',
  'Analyst cannot update ggircs_portal.incremental_fuel_charge_baseline'
);

select throws_like(
  $$
    delete from ggircs_portal.incremental_fuel_charge_baseline;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from ggircs_portal.incremental_fuel_charge_baseline'
);

select finish();
rollback;
