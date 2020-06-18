-- Verify ggircs-portal:trigger_functions/organisation_access_approved on pg

begin;

select pg_get_functiondef('ggircs_portal_private.organisation_access_approved()'::regprocedure);

rollback;
