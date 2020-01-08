-- Verify ggircs-portal:function_application_previous_submitted_revision on pg

begin;

select pg_get_functiondef('ggircs_portal.application_previous_submitted_revision(ggircs_portal.application)'::regprocedure);

rollback;
