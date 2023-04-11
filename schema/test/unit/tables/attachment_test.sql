set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(18);

-- Table exists
select has_table(
  'ggircs_portal', 'attachment',
  'ggircs_portal.attachment should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;

-- User 999 has access to application 999 (containing attachment 222), but not application 1000 (containing attachment 333)
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000), (555);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000), (555,555);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000), (555,555);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id, status) overriding system value values(999, 999, 999, 'approved'), (1000, 1000, 1000, 'approved');
insert into ggircs_portal.application_revision(application_id, version_number) overriding system value values(999, 1);
insert into ggircs_portal.ciip_user(id, uuid, email_address) overriding system value values (1001, '33333333-3333-3333-3333-333333333333', 'certifier@test.test');
insert into ggircs_portal.certification_url(id, application_id, version_number, certifier_email) overriding system value values('999', 999, 1, 'certifier@test.test');
insert into ggircs_portal.attachment(id, application_id) overriding system value values (222, 999),(333, 1000);



-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.attachment where id = 222 or id=333
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in attachment table'
);

select lives_ok(
  $$
    insert into ggircs_portal.attachment (id, application_id) overriding system value
    values (444, 1000);
  $$,
    'ciip_administrator can insert data in attachment table'
);

select lives_ok(
  $$
    update ggircs_portal.attachment set file_name = 'test filename' where id=444;
  $$,
    'ciip_administrator can change data in attachment table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.attachment where file_name = 'test filename' and id=444;
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.attachment where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_attachment'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select application_id from ggircs_portal.attachment
  $$,
  ARRAY[999::integer],
    'Industry user can view data from attachment for their applications'
);

select is_empty(
  $$
    select id from ggircs_portal.attachment where application_id = 1000;
  $$,
  'Industry user cannot view attachments for other other users applications'
);

select lives_ok(
  $$
    insert into ggircs_portal.attachment(application_id) values (999);
  $$,
    'Industry user can create an attachment for their applications '
);

select throws_like(
  $$
    insert into ggircs_portal.attachment(application_id) values (1000);
  $$,
  'new row violates%',
    'Industry User cannot create attachments for other users applications'
);

select lives_ok(
  $$
    update ggircs_portal.attachment set file_name = 'monkeyfuzz' where application_id=999;
  $$,
    'Industry user can update attachments for their applications'
);

select throws_like(
  $$
    update ggircs_portal.attachment set file_name = 'rainbowunicorn' where application_id=1000;
  $$,
  'permission denied%',
    'Industry User cannot update attachment belonging to others applications'
);

select lives_ok(
  $$
    delete from ggircs_portal.attachment where application_id=999;
  $$,
    'Industry user can delete their own attachments'
);

select throws_like(
  $$
    delete from ggircs_portal.attachment where application_id=1000;
  $$,
  'permission denied%',
    'Industry User cannot delete attachment belonging to others applications'
);


-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.attachment where application_id = 999 or application_id=1000;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table attachment'
);

select throws_like(
  $$
    update ggircs_portal.attachment set file_name = 'analyst' where id = 222;
  $$,
  'permission denied%',
  'Analyst cannot update table attachment'
);

select throws_like(
  $$
    insert into ggircs_portal.attachment(application_id) values (666);
  $$,
  'permission denied%',
    'Analyst cannot insert into table attachment'
);

select throws_like(
  $$
    delete from ggircs_portal.attachment where id = 222;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table attachment'
);

select finish();
rollback;
