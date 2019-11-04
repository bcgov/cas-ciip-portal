-- Verify ggircs-portal:table_user on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.user', 'select');

rollback;
