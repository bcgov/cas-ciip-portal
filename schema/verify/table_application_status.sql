-- Verify ggircs-portal:table_application on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.application_status', 'select');

ROLLBACK;
