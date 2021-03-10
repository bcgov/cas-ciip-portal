-- Verify ggircs-portal:tables/review_step on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.review_step', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'review_step', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'review_step', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'review_step', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'review_step', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'review_step', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'review_step', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'review_step', 'ciip_industry_user');

rollback;
