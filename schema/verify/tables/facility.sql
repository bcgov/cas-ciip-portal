-- Verify ggircs-portal:table_facility on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.facility', 'select');


-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'facility', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'facility', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'facility', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'facility', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'facility', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'facility', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'facility', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'facility', 'ciip_industry_user');

-- ciip_guest Grants

rollback;
