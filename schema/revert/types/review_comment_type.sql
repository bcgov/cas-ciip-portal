-- Revert ggircs-portal:types/review_comment_type from pg

begin;

drop type ggircs_portal.review_comment_type;

commit;
