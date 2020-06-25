-- Revert ggircs-portal:database_functions/get_valid_applications_for_reporter from pg

begin;

drop function ggircs_portal_private.get_valid_applications_for_reporter;

commit;
