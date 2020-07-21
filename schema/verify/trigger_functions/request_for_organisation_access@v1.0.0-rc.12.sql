-- Verify ggircs-portal:trigger_functions/request_for_organisation_access on pg

begin;

select pg_get_functiondef('ggircs_portal_private.request_for_organisation_access()'::regprocedure);

rollback;
