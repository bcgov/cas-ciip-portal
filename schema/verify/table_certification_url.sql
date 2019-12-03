-- Verify ggircs-portal:table_certification_url on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.certification_url', 'select');

rollback;
