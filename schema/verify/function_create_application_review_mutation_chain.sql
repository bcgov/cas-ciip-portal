-- Verify ggircs-portal:function_create_application_review_mutation_chain on pg

begin;

select pg_get_functiondef('ggircs_portal.create_application_review_mutation_chain(int, ggircs_portal.application_review_status, varchar)'::regprocedure);

rollback;
