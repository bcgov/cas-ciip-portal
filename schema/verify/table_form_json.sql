-- Verify ggircs-portal:table_form_json on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.form_json', 'select');

ROLLBACK;
