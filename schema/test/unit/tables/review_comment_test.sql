set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(39);

-- Table exists
select has_table(
  'ggircs_portal', 'review_comment',
  'ggircs_portal.review_comment should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'review_comment', 'id',
  'review_comment has an id column primary key'
);

select col_is_fk(
  'ggircs_portal', 'review_comment', 'application_id',
  'review_comment has foreign key on application_id referencing ggircs_portal.application'
);

select col_is_fk(
  'ggircs_portal', 'review_comment', 'form_id',
  'review_comment has foreign key on form_id referencing ggircs_portal.form_json'
);

select has_index(
  'ggircs_portal', 'review_comment', 'ggircs_portal_review_comment_application_foreign_key',
  'review_comment has an index on its foreign key (application_id)'
);

select has_index(
  'ggircs_portal', 'review_comment', 'ggircs_portal_review_comment_form_json_foreign_key',
  'review_comment has an index on its foreign key (form_id)'
);

-- Columns
select columns_are('ggircs_portal'::name, 'review_comment'::name, array[
  'id'::name,
  'application_id'::name,
  'form_id'::name,
  'description'::name,
  'comment_type'::name,
  'resolved'::name,
  'created_at'::name,
  'created_by'::name,
  'updated_at'::name,
  'updated_by'::name,
  'deleted_at'::name,
  'deleted_by'::name
]);

select col_type_is('ggircs_portal', 'review_comment', 'id', 'integer', 'id column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'application_id', 'integer', 'application_id column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'description', 'character varying(100000)', 'review_comment column should be type varchar(10000)');
select col_type_is('ggircs_portal', 'review_comment', 'comment_type', 'ggircs_portal.review_comment_type', 'comment_type column should be type review_comment_type');
select col_type_is('ggircs_portal', 'review_comment', 'created_at', 'timestamp with time zone', 'created_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'review_comment', 'created_by', 'integer', 'created_by column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'updated_at', 'timestamp with time zone', 'updated_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'review_comment', 'updated_by', 'integer', 'updated_by column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'deleted_at', 'timestamp with time zone', 'deleted_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'review_comment', 'deleted_by', 'integer', 'deleted_by column should be type integer');

select col_not_null('ggircs_portal', 'review_comment', 'id', 'id column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'application_id', 'application_id column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'form_id', 'form_id column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'created_at', 'created_at column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'updated_at', 'updated_at column should not be nullable');

-- Triggers
select has_trigger('ggircs_portal', 'review_comment', '_100_timestamps', 'review_comment has update timestamps trigger');


-- Row level security tests --

-- Test setup
create role test_superuser superuser;
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.review_comment
  disable trigger _100_timestamps;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

-- User 999 has access to review comment 999, but not review_comment 1000
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id) overriding system value values(999, 999, 999), (1000, 1000, 1000);
insert into ggircs_portal.review_comment(id, application_id, form_id, description, comment_type, created_by, resolved) overriding system value
  values (999, 999, 1, 'User can see this', 'requested change', 999, false), (1000, 999, 1, 'User cannot see this', 'internal', 1,false);


-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.review_comment where id = 999 or id=1000
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in review_comment table'
);

select lives_ok(
  $$
    insert into ggircs_portal.review_comment (id, application_id, form_id) overriding system value
    values (1001, 1000, 1);
  $$,
    'ciip_administrator can insert data in review_comment table'
);

select lives_ok(
  $$
    update ggircs_portal.review_comment set description='I made this' where id=1001;
  $$,
    'ciip_administrator can change data in review_comment table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.review_comment where description='I made this';
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.review_comment where id = 1001;
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_review_comment'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select id from ggircs_portal.review_comment
  $$,
  ARRAY[999::integer],
    'Industry user can view data from review_comment where the connection review_comment -> application -> facility -> ciip_user_organisation -> user exists on user.uuid = session.sub AND comment_type is requested change'
);

select is_empty (
  $$
    select * from ggircs_portal.review_comment where comment_type != 'requested change'
  $$,
    'Industry user cannot view internal comments'
);

select throws_like(
  $$
    insert into ggircs_portal.review_comment(application_id, form_id) values (1002, 1);
  $$,
  'permission denied%',
    'Industry User cannot create a row in ggircs_portal.review_comment'
);

select throws_like(
  $$
    update ggircs_portal.review_comment set description = 'denied' where application_id=999
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_review_comment'
);

select throws_like(
  $$
    delete from ggircs_portal.review_comment where application_id=999
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_review_comment'
);


-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.review_comment where id = 999 or id=1000;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table review_comment'
);

select lives_ok(
  $$
    insert into ggircs_portal.review_comment(id, application_id, form_id, created_by) overriding system value
    values (1005,999, 1, 999);
  $$,
    'Analyst can insert into table review_comment'
);

select lives_ok(
  $$
    update ggircs_portal.review_comment set resolved=true and created_by=999 where id=1005;
  $$,
    'Analyst can update table review_comment if they are the creator of the comment'
);

select results_eq(
  $$
    select resolved from ggircs_portal.review_comment where id = 1005;
  $$,
  ARRAY[true::boolean],
  'Analyst updated table review_comment'
);

-- Attempt to update comment where not the creator
update ggircs_portal.review_comment set resolved=true and created_by=1 where id=1000;

select results_eq(
  $$
    select resolved from ggircs_portal.review_comment where id = 1000;
  $$,
  ARRAY[false::boolean],
  'Analyst did not update review_comment created by different user'
);

select throws_like(
  $$
    delete from ggircs_portal.review_comment where application_id = 999;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table review_comment'
);

select finish();
rollback;
