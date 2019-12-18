-- Verify ggircs-portal:function_application_ordered_form_results on pg

begin;

select pg_get_functiondef('ggircs_portal.application_ordered_form_results(ggircs_portal.application, text)'::regprocedure);

rollback;
