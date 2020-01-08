-- Revert ggircs-portal:table_review_comment from pg

begin;

drop table ggircs_portal.review_comment;

commit;
