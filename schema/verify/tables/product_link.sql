-- Verify ggircs-portal:tables/product-link on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.product_link', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'product_link', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'product_link', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'product_link', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'product_link', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'product_link', 'ciip_industry_user');

rollback;
