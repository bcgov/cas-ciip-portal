-- Revert ggircs-portal:tables/application_revision_validation_function from pg

begin;

drop table ggircs_portal.application_revision_validation_function;

commit;
