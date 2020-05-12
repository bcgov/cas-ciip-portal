-- Verify ggircs-portal:table_application on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'application', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'application', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'application', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'application', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'application', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'application', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'application', 'ciip_industry_user');

-- ciip_guest Grants

rollback;
