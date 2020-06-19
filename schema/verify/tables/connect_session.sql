-- Verify ggircs-portal:tables/connect_session on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal_private.connect_session', 'select');

rollback;
