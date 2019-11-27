-- Verify ggircs-portal:table_application_review on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_review', 'select');

rollback;
