-- Verify ggircs-portal:tables/emission_category on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.emission_category', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'emission_category', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'emission_category', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'emission_category', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'emission_category', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'emission_category', 'ciip_industry_user');

rollback;
