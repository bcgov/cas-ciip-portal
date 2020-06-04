-- Revert ggircs-portal:trigger_functions/organisation_access_approved from pg

begin;

drop function ggircs_portal_private.organisation_access_approved;

commit;
