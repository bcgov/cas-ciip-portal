-- Verify ggircs-portal:gas on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.gas', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'gas', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'gas', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'gas', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'gas', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'gas', 'ciip_industry_user');

rollback;
