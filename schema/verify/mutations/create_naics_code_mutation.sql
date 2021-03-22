-- Verify ggircs-portal:mutations/create_naics_code_mutation on pg

begin;

select pg_get_functiondef('ggircs_portal.create_naics_code_mutation(text,text)'::regprocedure);

rollback;
