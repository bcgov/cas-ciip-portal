-- Verify ggircs-portal:computed_columns/application_revision_certification_url on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal.application_revision_certification_url');

rollback;
