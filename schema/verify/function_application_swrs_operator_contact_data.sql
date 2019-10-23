-- Verify ggircs-portal:function_application_swrs_operator_contact_data on pg

begin;

select pg_get_functiondef('ggircs_portal.application_swrs_operator_contact_data(ggircs_portal.application,varchar)'::regprocedure);

rollback;
