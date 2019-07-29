-- Verify ggircs-portal:table_form_result on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.form_result', 'select');

ROLLBACK;
