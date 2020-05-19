-- Verify ggircs-portal:policies/review_comment_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_review_comment', 'review_comment', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_review_comment', 'review_comment', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_review_comment', 'review_comment', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_review_comment', 'review_comment', 'ciip_analyst');
select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_review_comment', 'review_comment', 'ciip_analyst');
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_review_comment', 'review_comment', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_review_comment', 'review_comment', 'ciip_industry_user');

rollback;
