-- Verify ggircs-portal:table_application on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_revision_status', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'application_revision_status', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'application_revision_status', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'application_revision_status', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'application_revision_status', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'application_revision_status', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'application_revision_status', 'ciip_industry_user');

-- ciip_guest Grants

rollback;
