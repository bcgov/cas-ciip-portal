set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal_private', 'check_for_immutable_status',
  'Function signature_md5 should exist'
);

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

-- Set the timesamp to a time where the application window is open
create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

truncate ggircs_portal.application restart identity cascade;

select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_revision_mutation_chain(1,1);

select throws_like(
  $$
    insert into ggircs_portal.application_revision_status(application_id, version_number)
      values (1,1)
  $$,
  '%You cannot change the status of an application revision unless it is the current version%',
  'Trigger function throws error on application revision status change to a non-current version'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_revision_status(application_id, version_number)
      values (1,2)
  $$,
  'Trigger function does not throw when it should not'
);

select finish();

rollback;
