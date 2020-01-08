-- Verify ggircs-portal:table_form_result on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.form_result', 'select');

rollback;
