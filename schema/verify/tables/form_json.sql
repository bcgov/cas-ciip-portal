-- Verify ggircs-portal:table_form_json on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.form_json', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'form_json', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'form_json', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'form_json', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'form_json', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'form_json', 'ciip_industry_user');

rollback;
