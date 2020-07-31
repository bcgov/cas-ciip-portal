-- Verify ggircs-portal:computed_columns/application_current_user_can_edit on pg

begin;

select pg_get_functiondef('ggircs_portal.application_current_user_can_edit(ggircs_portal.application)'::regprocedure);

rollback;
