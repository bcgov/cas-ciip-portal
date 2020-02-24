set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(17);

-- Table exists
select has_table(
  'ggircs_portal', 'application_revision',
  'ggircs_portal.application_revision should exist, and be a table'
);

-- Row level security tests --

create role test_superuser superuser;

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;

-- User 999 has access to application_revision 999, but not application_revision 1000
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id) overriding system value values(999, 999, 999), (1000, 1000, 1000);
insert into ggircs_portal.application_revision(application_id, version_number) overriding system value values(999, 1), (1000, 1);


-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application_revision where application_id = 999 or application_id=1000
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in application_revision table'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_revision (application_id, version_number) overriding system value
    values (1000, 2);
  $$,
    'ciip_administrator can insert data in application_revision table'
);

select lives_ok(
  $$
    update ggircs_portal.application_revision set legal_disclaimer_accepted=true where application_id=1000 and version_number=2;
  $$,
    'ciip_administrator can change data in application_revision table'
);

select results_eq(
  $$
    select count(application_id) from ggircs_portal.application_revision where version_number = 2 and application_id=1000 and legal_disclaimer_accepted=true;
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision where application_id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_application_revision'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select application_id from ggircs_portal.application_revision
  $$,
  ARRAY[999::integer],
    'Industry user can view data from application_revision where the connection application_revision -> application -> facility -> ciip_user_organisation -> user exists on user.uuid = session.sub'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_revision(application_id, version_number) values (999, 2);
  $$,
    'Industry user can create an application_revision if the facility id is in the connection application_revision -> application -> facility -> ciip_user_organisation -> user '
);

select lives_ok(
  $$
    update ggircs_portal.application_revision set legal_disclaimer_accepted=true where application_id=999 and version_number=2;
  $$,
    'Industry user can update an application_revision if the facility id is in the connection application_revision -> application -> facility -> ciip_user_organisation -> user '
);

select throws_like(
  $$
    insert into ggircs_portal.application_revision(application_id, version_number) values (1000, 2);
  $$,
  'new row violates%',
    'Industry User cannot create a row in ggircs_portal.application_revision when not connected by application_revision -> application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select is_empty(
  $$
    select application_id from ggircs_portal.application_revision where application_id = 1000;
  $$,
  'Industry user view application_revisions that are not connected by application_revision -> application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision where application_id=999
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_application_revision'
);

-- Attempt to update a row that doesn't belong to the current user
update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=1000 and version_number=1;
set role test_superuser;

select is_empty(
  $$
    select * from ggircs_portal.application_revision where application_id=1000 and version_number = 1 and legal_disclaimer_accepted=true;
  $$,
    'Industry User cannot update rows in table_application_revision that are not connected by application_revision -> application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application_revision where application_id = 999 and version_number=1 or application_id=1000 and version_number=1;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table application_revision'
);

select throws_like(
  $$
    update ggircs_portal.application_revision set legal_disclaimer_accepted=true where application_id=1000 and version_number=1;
  $$,
  'permission denied%',
    'Analyst cannot update table application_revision'
);

select throws_like(
  $$
    insert into ggircs_portal.application_revision(application_id, version_number) values (1000,3);
  $$,
  'permission denied%',
    'Analyst cannot insert into table application_revision'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision where application_id = 999;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table application_revision'
);

select finish();
rollback;
