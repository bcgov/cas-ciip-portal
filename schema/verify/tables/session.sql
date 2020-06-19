-- Verify ggircs-portal:tables/session on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal_private.session', 'select');

rollback;
