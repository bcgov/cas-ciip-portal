-- Revert ggircs-portal:computed_columns/application_revision_validation from pg

begin;

drop function ggircs_portal.application_revision_validation;

commit;
