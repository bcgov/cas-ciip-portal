-- Verify ggircs-portal:table_organisation on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.organisation', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'organisation', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'organisation', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'organisation', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'organisation', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'organisation', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'organisation', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'organisation', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'organisation', 'ciip_industry_user');

rollback;
