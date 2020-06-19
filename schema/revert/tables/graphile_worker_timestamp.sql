-- Revert ggircs-portal:tables/graphile_worker_timestamp from pg

begin;

drop table ggircs_portal_private.graphile_worker_timestamp;

commit;
