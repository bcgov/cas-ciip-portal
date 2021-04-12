-- Deploy ggircs-portal:mutations/create_review_comment_mutation_chain to pg
-- requires: tables/review_comments

begin;

drop function ggircs_portal.create_review_comment_mutation_chain;

commit;
