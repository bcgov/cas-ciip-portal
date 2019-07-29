-- Verify ggircs-portal:schema_ggircs_portal on pg

BEGIN;

select pg_catalog.has_schema_privilege('ggircs_portal', 'usage');

ROLLBACK;
