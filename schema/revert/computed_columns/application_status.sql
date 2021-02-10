-- Revert ggircs-portal:computed_columns/application_status from pg

begin;

drop function ggircs_portal.application_status;

commit;
