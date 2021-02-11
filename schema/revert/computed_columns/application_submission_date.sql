-- Revert ggircs-portal:computed_columns/application_submission_date from pg

begin;

drop function ggircs_portal.application_submission_date;

commit;
