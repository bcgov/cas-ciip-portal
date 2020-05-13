-- Verify ggircs-portal:table_form_result on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.form_result', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'form_result', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'form_result', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'form_result', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'form_result', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('update', 'form_result', 'ciip_industry_user');

-- ciip_guest Grants

rollback;
