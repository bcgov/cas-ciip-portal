set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(11);

select has_function(
  'ggircs_portal_private', 'ensure_window_open_submit_application_status',
  'Function ensure_window_open_submit_application_status should exist'
);

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application_revision_status disable trigger _read_only_status_for_non_current_version;

-- Set the timestamp to a time where the application window is closed
-- 2020 open date minus one second
select mocks.set_mocked_time_in_transaction('2021-04-01 14:49:54.191757-07'::timestamptz - interval '1 second');

select throws_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'draft')$$,
  'You cannot start a draft when the application window is closed',
  'The trigger throws an error if starting a draft when the application window is closed'
);

-- Temporarily disable trigger to create a draft status
alter table ggircs_portal.application_revision_status disable trigger _ensure_window_open;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'draft');
alter table ggircs_portal.application_revision_status enable trigger _ensure_window_open;

select throws_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'submitted')$$,
  'You cannot submit an application when the application window is closed',
  'The trigger throws an error if submitting an application when the application window is closed and the previous status was draft'
);

select lives_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 2, 'draft')$$,
  'The trigger does not throw an error if starting a draft for a version > 1 when the application window is closed'
);

select lives_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 2, 'submitted')$$,
  'The trigger does not throw an error if submitting an application for a version > 1 when the application window is closed '
);

select lives_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'approved')$$,
  'The trigger does not throw when setting a status of approved'
);

select lives_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'rejected')$$,
  'The trigger does not throw when setting a status of rejected'
);

select lives_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'rejected')$$,
  'The trigger does not throw when setting a status of requested changes'
);

select lives_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 0, 'submitted')$$,
  'The trigger does not throw for version 0'
);

select isnt(
  (select application_revision_status from ggircs_portal.application_revision_status where application_id = 1 order by id desc limit 1),
  'draft',
  'The latest application_revision_status is not "draft"'
);

select lives_ok(
  $$insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'submitted')$$,
  'The trigger does not throw unless the latest status is "draft"'
);

select finish();

rollback;
