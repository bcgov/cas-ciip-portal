-- Verify ggircs-portal:tables/application_revision_validation_function on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_revision_validation_function', 'select');

rollback;
