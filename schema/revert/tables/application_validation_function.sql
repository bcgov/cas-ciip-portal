-- Revert ggircs-portal:tables/application_validation_function from pg

begin;

drop table ggircs_portal_private.application_validation_function;

commit;
