-- Verify ggircs-portal:table_emission_category_gas on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.emission_category_gas', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'emission_category_gas', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'emission_category_gas', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'emission_category_gas', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'emission_category_gas', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'emission_category_gas', 'ciip_industry_user');

rollback;
