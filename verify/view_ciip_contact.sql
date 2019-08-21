-- Verify ggircs-portal:view_ciip_contact on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_contact', 'select');

ROLLBACK;
