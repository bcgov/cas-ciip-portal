-- Verify ggircs-portal:view_ciip_operator on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_operator', 'select');

rollback;
