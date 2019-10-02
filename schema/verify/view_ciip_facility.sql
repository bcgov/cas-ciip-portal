-- Verify ggircs-portal:view_ciip_facility on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_facility', 'select');

rollback;
