-- Verify ggircs-portal:view_ciip_contact on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_contact', 'select');

rollback;
