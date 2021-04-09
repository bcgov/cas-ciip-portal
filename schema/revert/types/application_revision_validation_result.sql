-- Revert ggircs-portal:types/application_revision_validation_result from pg

begin;

drop type ggircs_portal.application_revision_validation_result;

commit;
