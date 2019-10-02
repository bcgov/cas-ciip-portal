-- Verify ggircs-portal:table_user_details on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.user_details', 'select');

ROLLBACK;
