-- Verify ggircs-portal:table_application_revision on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_revision', 'select');

rollback;
