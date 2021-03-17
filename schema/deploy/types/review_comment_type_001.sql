-- Deploy ggircs-portal:types/review_comment_type_001 to pg
-- requires: types/review_comment_type

begin;

create or replace function ggircs_portal_private.create_review_steps()
  returns void as $$
declare
  temp_row record;
  temp_id int;
begin
    for temp_row in
      select id from ggircs_portal.application
    loop
      insert into ggircs_portal.application_review_step(application_id, review_step_id)
      values (temp_row.id, 1)
      on conflict("application_id", "review_step_id") do nothing returning id into temp_id;
      update ggircs_portal.review_comment rc set application_review_step_id = temp_id where rc.application_id = temp_row.id and application_review_step_id is null;
    end loop;
end;
$$ language plpgsql volatile;

-- Data migration: rename deprecated types to 'general' for all rows in ggircs_portal.review_comment
update ggircs_portal.review_comment set comment_type = 'general' where comment_type in ('approval', 'requested change');
-- Data migration: add comments with null application_review_step_id to an application_review_step
select ggircs_portal_private.create_review_steps();

-- Temporarily modify RLS (column type cannot be changed if it is referenced in a policy statement)
select ggircs_portal_private.upsert_policy('ciip_industry_user_select_review_comment', 'review_comment', 'select', 'ciip_industry_user', 'true');

-- Remove 'approval' and 'requested change' comment types from
alter type ggircs_portal.review_comment_type rename to review_comment_type_old;
create type ggircs_portal.review_comment_type as enum ('general', 'internal');
alter table ggircs_portal.review_comment alter column comment_type type ggircs_portal.review_comment_type
  using comment_type::text::ggircs_portal.review_comment_type;
drop type ggircs_portal.review_comment_type_old;

-- Re-implement RLS 'select' policy for ciip_industry_user with proper 'using' statment
select ggircs_portal_private.upsert_policy(
  'ciip_industry_user_select_review_comment',
  'review_comment',
  'select',
  'ciip_industry_user',
  $$
    application_id in (select ggircs_portal_private.get_valid_review_comments())
    and comment_type!='internal'
  $$
);

drop function ggircs_portal_private.create_review_steps;

commit;
