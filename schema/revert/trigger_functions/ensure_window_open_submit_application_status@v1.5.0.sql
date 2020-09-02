-- Revert ggircs-portal:trigger_functions/ensure_window_open_submit_application_status from pg

begin;

drop function ggircs_portal_private.ensure_window_open_submit_application_status;

commit;
