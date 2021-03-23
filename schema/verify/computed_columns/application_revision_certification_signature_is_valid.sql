-- Verify ggircs-portal:computed_columns/application_revision_certification_signature_is_valid on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal.application_revision_certification_signature_is_valid');

rollback;
