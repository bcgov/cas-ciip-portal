-- Revert ggircs-portal:computed_columns/application_revision_certification_signature_is_valid from pg

begin;

drop function ggircs_portal.application_revision_certification_signature_is_valid;

commit;
