-- Verify ggircs-portal:trigger_functions/checksum_form_results on pg

begin;

select pg_get_functiondef('ggircs_portal_private.checksum_form_results()'::regprocedure);

rollback;
