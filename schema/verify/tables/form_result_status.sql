-- Verify ggircs-portal:tables/form_result_status on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.form_result', 'select');

rollback;
