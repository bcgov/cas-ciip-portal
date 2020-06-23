set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_function(
  'ggircs_portal_private', 'graphile_worker_job_definer',
  'Function graphile_worker_job_definer should exist'
);

select finish();
rollback;
