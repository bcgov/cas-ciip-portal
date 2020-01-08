-- Verify ggircs-portal:table_form_json on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.form_json', 'select');

rollback;
