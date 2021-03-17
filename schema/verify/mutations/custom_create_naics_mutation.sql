-- Verify ggircs-portal:mutations/custom_create_naics_mutation on pg

begin;

select pg_get_functiondef('ggircs_portal.custom_create_naics_mutation(int,text)'::regprocedure);

rollback;
