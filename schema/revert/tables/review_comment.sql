-- Revert ggircs-portal:table_review_comment from pg

begin;

drop table ggircs_portal.review_comment;
drop function ggircs_portal.get_valid_review_comments;
drop function ggircs_portal.analyst_owns_comment;

commit;
