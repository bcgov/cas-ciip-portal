-- Revert ggircs-portal:database_functions/graphile_worker_job_definer from pg

begin;

drop function ggircs_portal_private.graphile_worker_job_definer;

commit;
