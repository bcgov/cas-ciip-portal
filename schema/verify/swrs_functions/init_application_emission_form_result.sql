-- Verify ggircs-portal:function_init_application_emission_form_result on pg

begin;

select pg_get_functiondef('ggircs_portal.init_application_emission_form_result(integer, integer)'::regprocedure);

rollback;
