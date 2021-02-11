-- Verify ggircs-portal:computed_columns/application_operator_name on pg

begin;

select pg_get_functiondef('ggircs_portal.application_operator_name(ggircs_portal.application)'::regprocedure);

rollback;
