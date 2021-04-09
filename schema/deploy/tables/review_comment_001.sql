-- Deploy ggircs-portal:tables/review_comment_001 to pg
-- requires: tables/review_comment

begin;

alter table ggircs_portal.review_comment drop column form_id;
alter table ggircs_portal.review_comment add column application_review_step_id int references ggircs_portal.application_review_step(id);
create index ggircs_portal_review_comment_app_review_step_foreign_key on ggircs_portal.review_comment(application_review_step_id);
comment on column ggircs_portal.review_comment.application_review_step_id is 'Foreign key to application_review_step. Defines the review step that this comment belongs to.';

create or replace function ggircs_portal_private.connect_comments_to_review_step()
  returns void as $$
declare
  temp_row record;
  temp_id int;
begin
    for temp_row in
      select * from ggircs_portal.application_review_step
    loop
      update ggircs_portal.review_comment rc set application_review_step_id = temp_row.id where rc.application_id = temp_row.application_id and rc.application_review_step_id is null;
    end loop;
end;
$$ language plpgsql volatile;

-- Data migration: add comments with null application_review_step_id to an application_review_step
select ggircs_portal_private.connect_comments_to_review_step();

drop function ggircs_portal_private.connect_comments_to_review_step;

alter table ggircs_portal.review_comment alter column application_review_step_id set not null;

commit;
