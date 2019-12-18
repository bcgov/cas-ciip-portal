-- Verify ggircs-portal:function_application_revision_application_revision_status on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_application_revision_status(ggircs_portal.application_revision)'::regprocedure);

rollback;
