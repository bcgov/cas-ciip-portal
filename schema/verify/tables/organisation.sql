-- Verify ggircs-portal:table_organisation on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.organisation', 'select');

rollback;
