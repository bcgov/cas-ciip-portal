-- Revert ggircs-portal:database_functions/get_valid_applications_for_certifier from pg

begin;

drop function ggircs_portal_private.get_valid_applications_for_certifier;

commit;
