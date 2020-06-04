set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(42);

-- Table exists
select has_table(
  'ggircs_portal', 'application_revision_status',
  'ggircs_portal.application_revision_status should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'application_revision_status', 'id',
  'application_revision_status has an id column primary key'
);

select col_is_fk(
  'ggircs_portal', 'application_revision_status', ARRAY['application_id', 'version_number'],
  'application_revision_status has a composite foreign key on application_id and version_number'
);

select has_index(
  'ggircs_portal', 'application_revision_status', 'ggircs_portal_application_revision_status_foreign_key',
  'application_revision_status has an index on its foreign key (application_id, version_number)'
);

-- Columns
select columns_are('ggircs_portal'::name, 'application_revision_status'::name, array[
  'id'::name,
  'application_id'::name,
  'version_number'::name,
  'application_revision_status'::name,
  'created_at'::name,
  'created_by'::name,
  'updated_at'::name,
  'updated_by'::name,
  'deleted_at'::name,
  'deleted_by'::name
]);

select col_type_is('ggircs_portal', 'application_revision_status', 'id', 'integer', 'id column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'application_id', 'integer', 'application_id column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'version_number', 'integer', 'version_number column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'application_revision_status', 'ggircs_portal.ciip_application_revision_status', 'application_revision_status column should be type ciip_application_revision_status');
select col_type_is('ggircs_portal', 'application_revision_status', 'created_at', 'timestamp with time zone', 'created_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'application_revision_status', 'created_by', 'integer', 'created_by column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'updated_at', 'timestamp with time zone', 'updated_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'application_revision_status', 'updated_by', 'integer', 'updated_by column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'deleted_at', 'timestamp with time zone', 'deleted_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'application_revision_status', 'deleted_by', 'integer', 'deleted_by column should be type integer');

select col_not_null('ggircs_portal', 'application_revision_status', 'id', 'id column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'application_id', 'application_id column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'version_number', 'version_number column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'created_at', 'created_at column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'updated_at', 'updated_at column should not be nullable');

-- Triggers
select has_trigger('ggircs_portal', 'application_revision_status', '_ensure_window_open', 'application_revision_status has window open trigger');
select has_trigger('ggircs_portal', 'application_revision_status', '_100_timestamps', 'application_revision_status has update timestamps trigger');
select has_trigger('ggircs_portal', 'application_revision_status', '_checksum_form_results', 'application_revision_status has checksum form results trigger');
select has_trigger('ggircs_portal', 'application_revision_status', '_read_only_status_for_non_current_version', 'application_revision_status has _read_only_status_for_non_current_version trigger');

-- Row level security tests

create role test_superuser superuser;

-- Test setup
-- Triggers are disabled as we are only testing in the scope of row level security
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application_revision_status disable trigger _check_certification_signature_md5;
alter table ggircs_portal.application_revision_status disable trigger _read_only_status_for_non_current_version;
alter table ggircs_portal.certification_url disable trigger _check_form_result_md5;
alter table ggircs_portal.certification_url disable trigger _create_form_result_md5;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

-- User 999 has access to application_revision 999, but not application_revision 1000
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id) overriding system value values(999, 999, 999), (1000, 1000, 1000);
insert into ggircs_portal.application_revision(application_id, version_number) overriding system value values(999, 1), (999,2), (1000, 1), (1000, 2);
insert into ggircs_portal.application_revision_status(id, application_id, version_number) overriding system value values (999,999,1), (1000, 1000, 1);

insert into ggircs_portal.ciip_user(id, uuid, email_address) overriding system value values (1001, '33333333-3333-3333-3333-333333333333', 'certifier@test.test');
insert into ggircs_portal.certification_url(id, application_id, version_number, certifier_email) overriding system value values('999', 999, 1, 'certifier@test.test');


-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application_revision_status where id = 999 or id=1000
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in application_revision_status table'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_revision_status (application_id, version_number, application_revision_status)
    values (1000, 2, 'approved');
  $$,
    'ciip_administrator can insert data in application_revision_status table'
);

select throws_like(
  $$
    update ggircs_portal.application_revision_status set application_revision_status='approved' where id=1;
  $$,
  'permission denied%',
    'Administrator cannot update rows in table_application_revision_status'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision_status where id=999
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_application_revision_status'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select application_id from ggircs_portal.application_revision_status
  $$,
  ARRAY[999::integer],
    'Industry user can view data from application_revision_status where the connection application_revision_status -> application -> facility -> ciip_user_organisation -> user exists on user.uuid = session.sub'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (999, 2, 'submitted');
  $$,
    'Industry user can create an application_revision_status if the facility id is in the connection application_revision -> application -> facility -> ciip_user_organisation -> user '
);

select throws_like(
  $$
    insert into ggircs_portal.application_revision_status(application_id, version_number) values (1000, 2);
  $$,
  'new row violates%',
    'Industry User cannot create a row in ggircs_portal.application_revision_status when not connected by application_revision_status -> application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select is_empty(
  $$
    select application_id from ggircs_portal.application_revision where application_id = 1000;
  $$,
  'Industry user cannot view application_revision_statuses that are not connected by application_revision_status -> application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select throws_like(
  $$
    update ggircs_portal.application_revision_status set application_revision_status='approved' where id=999;
  $$,
  'permission denied%',
    'Industry user cannot update rows in table_application_revision_status'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision_status where application_id=999
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_application_revision_status'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application_revision_status where application_id = 999 and version_number=1 or application_id=1000 and version_number=1;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table application_revision_status'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_revision_status(id, application_id, version_number, application_revision_status)
    overriding system value
    values(1002, 1000, 1, 'approved');
  $$,
  'Analyst can insert data in the application_revision_status table'
);

select throws_like(
  $$
    update ggircs_portal.application_revision_status set application_revision_status='approved' where application_id=1000 and version_number=1;
  $$,
  'permission denied%',
    'Analyst cannot update table application_revision_status'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision_status where application_id = 999;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table application_revision_status'
);

-- CIIP_INDUSTRY_USER (Certifier)
set role ciip_industry_user;
set jwt.claims.sub to '33333333-3333-3333-3333-333333333333';

select results_eq(
  $$
    select distinct application_id from ggircs_portal.application_revision_status
  $$,
  ARRAY[999::integer],
    'Certifier can view data from application_revision_status where the current users certifier_email on certification_url maps to an application'
);

select throws_like(
  $$
    insert into ggircs_portal.application_revision_status(application_id, version_number) values (999, 3);
  $$,
  'new row violates%',
    'Certifier cannot create a row in ggircs_portal.application_revision_status'
);

select throws_like(
  $$
    update ggircs_portal.application_revision_status set application_revision_status='approved' where application_id=999 and version_number=1;
  $$,
  'permission denied%',
    'Certifier cannot update table application_revision_status'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision_status where application_id = 999;
  $$,
  'permission denied%',
    'Certifier cannot delete rows from table application_revision_status'
);

select finish();
rollback;
