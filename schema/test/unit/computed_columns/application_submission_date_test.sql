set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'application_submission_date', array['ggircs_portal.application'],
  'Function application_submission_date should exist'
);

with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select pg_typeof((select ggircs_portal.application_submission_date((select * from record))));

select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select pg_typeof((select ggircs_portal.application_submission_date((select * from record))))
  $$,
  ARRAY['timestamp with time zone'::regtype],
  'application_submission_date returns scalar type timestamptz'
);

select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select ggircs_portal.application_submission_date((select * from record))
  $$,
  ARRAY[(with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select created_at from ggircs_portal.application_application_revision_status((select * from record), null))::timestamptz],
  'application_submission_date returns a created_at date when passed an application object'
);

select finish();
rollback;
