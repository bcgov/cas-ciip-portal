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

rollback;
