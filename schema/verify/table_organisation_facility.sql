-- Verify ggircs-portal:table_organisation_facility on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.organisation_facility', 'select');

rollback;
