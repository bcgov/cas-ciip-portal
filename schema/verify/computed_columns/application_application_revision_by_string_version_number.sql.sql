-- Verify ggircs-portal:computed_columns/application_application_revision_by_string_version_number.sql on pg

begin;

select pg_get_functiondef('ggircs_portal.application_application_revision_by_string_version_number(ggircs_portal.application, text)'::regprocedure);

rollback;
