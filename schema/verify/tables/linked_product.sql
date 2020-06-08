-- Verify ggircs-portal:tables/product-link on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.linked_product', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'linked_product', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'linked_product', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'linked_product', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'linked_product', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'linked_product', 'ciip_industry_user');

rollback;
