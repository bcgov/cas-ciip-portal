set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'application_status', array['ggircs_portal.application'],
  'Function application_status should exist'
);

with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select pg_typeof((select ggircs_portal.application_status((select * from record))));


select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select pg_typeof((select ggircs_portal.application_status((select * from record))))
  $$,
  ARRAY['ggircs_portal.ciip_application_revision_status'::regtype],
  'application_status returns scalar type varchar'
);

select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select ggircs_portal.application_status((select * from record))
  $$,
  ARRAY[(with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select application_revision_status from ggircs_portal.application_application_revision_status((select * from record), null))::ggircs_portal.ciip_application_revision_status],
  'application_status returns a status when passed an application object'
);

select finish();
rollback;
