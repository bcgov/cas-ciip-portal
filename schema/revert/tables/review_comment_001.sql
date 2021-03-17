-- Revert ggircs-portal:tables/review_comment_001 from pg

begin;

alter table ggircs_portal.review_comment add column form_id int references ggircs_portal.form_json(id);
alter table ggircs_portal.review_comment drop column application_review_step_id;

commit;
