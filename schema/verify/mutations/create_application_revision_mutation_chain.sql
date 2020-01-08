-- Verify ggircs-portal:function_create_application_revision_mutation_chain on pg

begin;

select pg_get_functiondef('ggircs_portal.create_application_revision_mutation_chain(int, int)'::regprocedure);

rollback;
