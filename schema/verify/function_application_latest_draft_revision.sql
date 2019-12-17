-- Verify ggircs-portal:function_application_latest_draft_version_number on pg

begin;

select pg_get_functiondef('ggircs_portal.application_latest_draft_revision(ggircs_portal.application)'::regprocedure);

rollback;
