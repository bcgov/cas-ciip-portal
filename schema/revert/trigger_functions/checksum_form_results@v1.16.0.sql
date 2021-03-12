-- Revert ggircs-portal:trigger_functions/checksum_form_results from pg

begin;

drop function ggircs_portal_private.checksum_form_results;

commit;
