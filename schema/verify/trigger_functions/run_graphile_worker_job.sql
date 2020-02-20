-- Verify ggircs-portal:trigger_functions/run_graphile_worker_job on pg

begin;

select pg_get_functiondef('ggircs_portal_private.run_graphile_worker_job()'::regprocedure);

rollback;
