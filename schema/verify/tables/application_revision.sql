-- Verify ggircs-portal:table_application_revision on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_revision', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'application_revision', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'application_revision', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'application_revision', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'application_revision', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'application_revision', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'application_revision', 'ciip_industry_user');

-- ciip_guest Grants

rollback;
