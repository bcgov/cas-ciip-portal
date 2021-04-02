-- Revert ggircs-portal:computed_columns/application_validation from pg

begin;

drop function ggircs_portal.application_validation;

commit;
