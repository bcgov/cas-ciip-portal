-- Verify ggircs-portal:view_ciip_fuel on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_fuel', 'select');

rollback;
