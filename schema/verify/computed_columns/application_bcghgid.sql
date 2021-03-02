-- Verify ggircs-portal:computed_columns/application_bcghgid on pg

begin;

select pg_get_functiondef('ggircs_portal.application_bcghgid(ggircs_portal.application)'::regprocedure);

rollback;
