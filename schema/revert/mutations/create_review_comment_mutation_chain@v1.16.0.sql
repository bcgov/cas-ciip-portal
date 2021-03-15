-- Revert ggircs-portal:mutations/create_review_comment_mutation_chain from pg

begin;

drop function ggircs_portal.create_review_comment_mutation_chain;

commit;
