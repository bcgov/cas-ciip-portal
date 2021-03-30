-- Revert ggircs-portal:types/application_validation_result from pg

begin;

drop type ggircs_portal.application_validation_result;

commit;
