-- Verify ggircs-portal:database_functions/graphile_worker_job_definer_001 on pg

begin;

select pg_get_functiondef('ggircs_portal_private.graphile_worker_job_definer(text, json)'::regprocedure);

rollback;
