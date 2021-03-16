-- Revert ggircs-portal:review_comment_type_001 from pg

begin;

-- Temporarily modify RLS (column type cannot be changed if it is referenced in a policy statement)
select ggircs_portal_private.upsert_policy('ciip_industry_user_select_review_comment', 'review_comment', 'select', 'ciip_industry_user', 'true');

-- Note: data migration cannot be reverted.
alter type ggircs_portal.review_comment_type rename to review_comment_type_old;
create type ggircs_portal.review_comment_type as enum ('general', 'internal', 'approval', 'requested change');
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

commit;
