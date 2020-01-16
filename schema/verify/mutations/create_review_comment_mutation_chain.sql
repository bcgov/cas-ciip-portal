-- Verify ggircs-portal:mutations/create_review_comment_mutation_chain on pg

begin;

select pg_get_functiondef('ggircs_portal.create_review_comment_mutation_chain(int, int, varchar(100000), ggircs_portal.review_comment_type, int)'::regprocedure);

rollback;
