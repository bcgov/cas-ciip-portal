set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'application_facility_name', array['ggircs_portal.application'],
  'Function application_facility_name should exist'
);

with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select pg_typeof((select ggircs_portal.application_facility_name((select * from record))));

select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select pg_typeof((select ggircs_portal.application_facility_name((select * from record))))
  $$,
  ARRAY['character varying'::regtype],
  'application_facility_name returns scalar type varchar'
);

select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select ggircs_portal.application_facility_name((select * from record))
  $$,
  ARRAY[(select facility_name from ggircs_portal.facility f join ggircs_portal.application a on a.facility_id = f.id and a.id=1)::varchar],
  'application_facility_name returns a facility name when passed an application object'
);

select finish();
rollback;
