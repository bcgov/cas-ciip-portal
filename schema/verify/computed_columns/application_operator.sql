-- Verify ggircs-portal:computed_columns/application_operator on pg

begin;

select pg_get_functiondef('ggircs_portal.application_operator(ggircs_portal.application)'::regprocedure);

rollback;
