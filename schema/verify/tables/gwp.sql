-- Verify ggircs-portal:tables/gwp on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.gwp', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'gwp', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'gwp', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'gwp', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'gwp', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'gwp', 'ciip_industry_user');

rollback;
