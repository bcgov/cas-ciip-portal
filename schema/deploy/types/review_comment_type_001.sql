-- Deploy ggircs-portal:types/review_comment_type_001 to pg
-- requires: types/review_comment_type

begin;

-- Data migration: rename deprecated types to 'general' for all rows in ggircs_portal.review_comment
update ggircs_portal.review_comment set comment_type = 'general' where comment_type in ('approval', 'requested change');

-- Temporarily modify RLS (column type cannot be changed if it is referenced in a policy statement)
select ggircs_portal_private.upsert_policy('ciip_industry_user_select_review_comment', 'review_comment', 'select', 'ciip_industry_user', 'true');

-- Remove 'approval' and 'requested change' comment types from
alter type ggircs_portal.review_comment_type rename to review_comment_type_old;
create type ggircs_portal.review_comment_type as enum ('general', 'internal');
alter table ggircs_portal.review_comment alter column comment_type type ggircs_portal.review_comment_type
  using comment_type::text::ggircs_portal.review_comment_type;
drop type ggircs_portal.review_comment_type_old;

create or replace function ggircs_portal_private.get_valid_review_comments()
returns setof integer as
$fn$
  select ars.id from ggircs_portal.application_review_step ars
    join ggircs_portal.application a
      on ars.application_id = a.id
    join ggircs_portal.facility f
      on a.facility_id = f.id
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session())
$fn$ language sql strict stable;

-- Re-implement RLS 'select' policy for ciip_industry_user with proper 'using' statment
select ggircs_portal_private.upsert_policy(
  'ciip_industry_user_select_review_comment',
  'review_comment',
  'select',
  'ciip_industry_user',
  $$
    application_review_step_id in (select ggircs_portal_private.get_valid_review_comments())
    and comment_type!='internal'
  $$
);

alter table ggircs_portal.review_comment drop column application_id;

commit;
