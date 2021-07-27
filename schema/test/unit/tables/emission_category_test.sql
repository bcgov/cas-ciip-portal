set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(16);

create role test_superuser superuser;

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
select test_helper.modify_triggers('disable');
select test_helper.create_test_users();

insert into ggircs_portal.emission_category(id, swrs_emission_category, display_name, deleted_at, carbon_taxed)
overriding system value
values
(1, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'General Stationary Combustion', null, true),
(2, 'BC_ScheduleB_IndustrialProcessEmissions', 'Industrial Process', null, false),
(3, 'BC_ScheduleB_VentingEmissions', 'Venting', null, true),
(4, 'BC_ScheduleB_FlaringEmissions', 'Flaring', null, true),
(5, 'BC_ScheduleB_FugitiveEmissions', 'Fugitive', null, false),
(6, 'BC_ScheduleB_OnSiteTransportationEmissions', 'On-Site Transportation', null, true),
(7, 'BC_ScheduleB_WasteEmissions', 'Waste', null, false),
(8, 'BC_ScheduleB_WastewaterEmissions', 'Wastewater', null, false),
(9, null, 'Other, non-carbon taxed', '2021-04-13 00:00:00-07', false);

set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111');

-- Table exists
select has_table(
  'ggircs_portal', 'emission_category',
  'ggircs_portal.emission_category should exist, and be a table'
);

-- Columns
select columns_are('ggircs_portal'::name, 'emission_category'::name, array[
  'id'::name,
  'swrs_emission_category'::name,
  'display_name'::name,
  'created_at'::name,
  'created_by'::name,
  'updated_at'::name,
  'updated_by'::name,
  'deleted_at'::name,
  'deleted_by'::name,
  'carbon_taxed'::name,
  'category_definition'::name
]);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category;
  $$,
  ARRAY[9::bigint],
    'ciip_administrator can view all data in emission_category table'
);

select lives_ok(
  $$
    insert into ggircs_portal.emission_category (id, display_name) overriding system value
    values (1000, 'admin created');
  $$,
    'ciip_administrator can insert data in emission_category table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category where display_name='admin created'
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.emission_category set display_name='admin changed' where id=1000;
  $$,
    'ciip_administrator can change data in emission_category table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category where display_name='admin changed'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.emission_category where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_emission_category'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category;
  $$,
  ARRAY[10::bigint],
    'Industry User can view all data in emission_category table'
);

select throws_like(
  $$
    insert into ggircs_portal.emission_category (id, display_name) overriding system value
    values (1001, 'denied');
  $$,
  'permission denied%',
    'Industry User cannot insert into table_emission_category'
);

select throws_like(
  $$
    update ggircs_portal.emission_category set display_name='denied' where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_emission_category'
);

select throws_like(
  $$
    delete from ggircs_portal.emission_category where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_emission_category'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category;
  $$,
  ARRAY[10::bigint],
    'ciip_analyst can view all data in emission_category table'
);

select throws_like(
  $$
    insert into ggircs_portal.emission_category (id, display_name) overriding system value
    values (1001, 'denied');
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_emission_category'
);

select throws_like(
  $$
    update ggircs_portal.emission_category set display_name='denied' where id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_emission_category'
);

select throws_like(
  $$
    delete from ggircs_portal.emission_category where id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_emission_category'
);

select finish();
rollback;
