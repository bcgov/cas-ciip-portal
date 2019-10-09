-- Verify ggircs-portal:table_ciip_application_wizard on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_application_wizard', 'select');

rollback;
