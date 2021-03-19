-- Revert ggircs-portal:computed_columns/application_revision_is_immutable from pg

begin;

drop function ggircs_portal.application_revision_is_immutable;

commit;
