-- Verify ggircs-portal:trigger_functions/ensure_window_open_submit_application_status on pg

begin;

select pg_get_functiondef('ggircs_portal.ensure_window_open_submit_application_status()'::regprocedure);

rollback;
