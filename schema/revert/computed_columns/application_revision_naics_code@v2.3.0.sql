-- Revert ggircs-portal:computed_columns/application_revision_naics_code from pg

begin;

drop function ggircs_portal.application_revision_naics_code;

commit;
