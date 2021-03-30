-- Verify ggircs-portal:tables/application_validation_function on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal_private.application_validation_function', 'select');

rollback;
