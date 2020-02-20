-- Revert ggircs-portal:trigger_functions/run_graphile_worker_job from pg

begin;

drop function ggircs_portal_private.run_graphile_worker_job;

commit;
