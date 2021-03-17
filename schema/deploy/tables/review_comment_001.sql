-- Deploy ggircs-portal:tables/review_comment_001 to pg
-- requires: tables/review_comment

begin;

alter table ggircs_portal.review_comment drop column form_id;
alter table ggircs_portal.review_comment add column application_review_step_id int references ggircs_portal.application_review_step(id);
create index ggircs_portal_review_comment_app_review_step_foreign_key on ggircs_portal.review_comment(application_review_step_id);
comment on column ggircs_portal.review_comment.application_review_step_id is 'Foreign key to application_review_step. Defines the review step that this comment belongs to.';

commit;
