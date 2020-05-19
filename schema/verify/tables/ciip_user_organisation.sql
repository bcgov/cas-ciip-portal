-- Verify ggircs-portal:table_user_organisation on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_user_organisation', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'ciip_user_organisation', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'ciip_user_organisation', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'ciip_user_organisation', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'ciip_user_organisation', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'ciip_user_organisation', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'ciip_user_organisation', 'ciip_industry_user');

rollback;
