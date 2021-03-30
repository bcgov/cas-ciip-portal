-- Verify ggircs-portal:tables/form_json_001 on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.form_json', 'select');

rollback;
