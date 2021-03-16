-- Deploy ggircs-portal:tables/review_comment_001 to pg
-- requires: tables/review_comment

begin;

alter table ggircs_portal.review_comment drop column form_id;

commit;
