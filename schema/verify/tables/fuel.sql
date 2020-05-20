-- Verify ggircs-portal:table_fuel on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.fuel', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'fuel', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'fuel', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'fuel', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'fuel', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'fuel', 'ciip_industry_user');

rollback;
