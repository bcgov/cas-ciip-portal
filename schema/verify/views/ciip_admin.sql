-- Verify ggircs-portal:views/ciip_admin on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_admin', 'select');

rollback;
