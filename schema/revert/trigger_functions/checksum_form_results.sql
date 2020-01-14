-- Revert ggircs-portal:trigger_functions/checksum_form_results from pg

begin;

drop function ggircs_portal.checksum_form_results;

commit;
