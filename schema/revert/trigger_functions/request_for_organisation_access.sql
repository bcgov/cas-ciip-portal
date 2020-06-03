-- Revert ggircs-portal:trigger_functions/request_for_organisation_access from pg

begin;

drop function ggircs_portal_private.request_for_organisation_access;

commit;
