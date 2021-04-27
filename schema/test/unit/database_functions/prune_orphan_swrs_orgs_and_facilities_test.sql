set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(7);

-- Test setup
select test_helper.clean_ggircs_portal_schema();
select test_helper.modify_triggers('disable');
select test_helper.create_test_users();

insert into ggircs_portal.organisation (operator_name, swrs_organisation_id)
  values ('Test no swrs 1', 123456),('Test no swrs 2', 999999), ('Test with swrs', 3091), ('Test null swrs', null);

insert into ggircs_portal.facility (facility_name, swrs_facility_id, organisation_id)
  values
    ('Test facility no swrs 1', 654321, (select id from ggircs_portal.organisation where operator_name = 'Test no swrs 1')),
    ('Test facility no swrs has org 1', 654333, (select id from ggircs_portal.organisation where operator_name = 'Test with swrs')),
    ('Test facility with swrs', 75056, (select id from ggircs_portal.organisation where operator_name = 'Test with swrs')),
    ('Test facility null swrs', null, (select id from ggircs_portal.organisation where operator_name = 'Test with swrs'));

insert into ggircs_portal.ciip_user_organisation (user_id, organisation_id)
  values
    ((select id from ggircs_portal.ciip_user limit 1), (select id from ggircs_portal.organisation where operator_name = 'Test with swrs')),
    ((select id from ggircs_portal.ciip_user limit 1), (select id from ggircs_portal.organisation where operator_name = 'Test no swrs 1'));

select has_function(
  'ggircs_portal_private', 'prune_orphan_swrs_orgs_and_facilities',
  'Function prune_orphan_swrs_orgs_and_facilities should exist'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.facility
  $$,
  $$
    values (4::bigint)
  $$,
  'there should be 4 facilities in the ggircs_portal schema'
);
select results_eq(
  $$
    select count(*) from ggircs_portal.organisation
  $$,
  $$
    values (4::bigint)
  $$,
  'there should be 4 organisations in the ggircs_portal schema'
);
select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_user_organisation
  $$,
  $$
    values (2::bigint)
  $$,
  'there should be 2 access requests in the ggircs_portal schema'
);


select ggircs_portal_private.prune_orphan_swrs_orgs_and_facilities();

-- verify that we delete the right facilities
select results_eq(
  $$
    select facility_name from ggircs_portal.facility
  $$,
  $$
    values ('Test facility with swrs'::varchar), ('Test facility null swrs'::varchar)
  $$,
  'prune_orphan_swrs_orgs_and_facilities should delete all facilities where swrs_facility_id doesnt exist in the swrs schema, and is not null'
);

-- verify that we delete the right organisation access records
select results_eq(
  $$
    select organisation_id from ggircs_portal.ciip_user_organisation
  $$,
  $$
    values ((select id from ggircs_portal.organisation where operator_name = 'Test with swrs'))
  $$,
  'prune_orphan_swrs_orgs_and_facilities should delete all organisation access for organisations where a swrs_organisation_id doesnt exist in the swrs schema'
);


-- verify that we delete the right organisations
select results_eq(
  $$
    select operator_name from ggircs_portal.organisation
  $$,
  $$
    values ('Test with swrs'::varchar), ('Test null swrs'::varchar)
  $$,
  'prune_orphan_swrs_orgs_and_facilities should delete all organisations where a swrs_organisation_id doesnt exist in the swrs schema, and is not null'
);



select finish();
rollback;
