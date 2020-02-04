-- Verify ggircs-portal:table_flag on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.review_comment', 'select');
select pg_get_functiondef('ggircs_portal_private.get_valid_review_comments()'::regprocedure);
select pg_get_functiondef('ggircs_portal_private.analyst_owns_comment()'::regprocedure);

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'review_comment', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'review_comment', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'review_comment', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'review_comment', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'review_comment', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'review_comment', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'review_comment', 'ciip_industry_user');

-- ciip_guest Grants

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

-- ciip_guest Policies

rollback;
