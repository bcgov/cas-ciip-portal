-- Verify ggircs-portal:table_user on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.user', 'select');

ROLLBACK;
