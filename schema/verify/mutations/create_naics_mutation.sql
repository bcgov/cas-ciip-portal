-- Verify ggircs-portal:mutations/create_naics_mutation on pg

begin;

select pg_get_functiondef('ggircs_portal.create_naics_mutation(int,text)'::regprocedure);

rollback;
