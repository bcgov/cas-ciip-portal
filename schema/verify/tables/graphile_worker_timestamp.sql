-- Verify ggircs-portal:tables/graphile_worker_timestamp on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal_private.graphile_worker_timestamp', 'select');

rollback;
