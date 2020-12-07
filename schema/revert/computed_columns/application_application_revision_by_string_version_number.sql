-- Revert ggircs-portal:computed_columns/application_application_revision_by_string_version_number from pg

begin;

drop function ggircs_portal.application_application_revision_by_string_version_number(ggircs_portal.application, text);

commit;
