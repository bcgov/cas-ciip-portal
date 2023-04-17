-- Verify ggircs-portal:tables/attachment on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.attachment', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'attachment', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'attachment', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'attachment', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'attachment', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'attachment', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'attachment', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('update', 'attachment', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('delete', 'attachment', 'ciip_industry_user');


-- ciip_guest Grants

rollback;
