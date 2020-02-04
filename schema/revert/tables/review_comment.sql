-- Revert ggircs-portal:table_review_comment from pg

begin;

drop table ggircs_portal.review_comment;
drop function ggircs_portal_private.get_valid_review_comments;
drop function ggircs_portal_private.analyst_owns_comment;

commit;
