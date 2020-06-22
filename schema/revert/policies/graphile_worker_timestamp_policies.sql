-- Revert ggircs-portal:policies/graphile_worker_timestamp_policies from pg

BEGIN;

drop policy all_select on ggircs_portal_private.graphile_worker_timestamp;
drop policy all_insert on ggircs_portal_private.graphile_worker_timestamp;

COMMIT;
