-- Verify ggircs-portal:mutations/create_naics_code on pg

begin;

select pg_get_functiondef('ggircs_portal.create_naics_code(text,text,text)'::regprocedure);

rollback;
