-- Verify ggircs-portal:table_certification_url on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.certification_url', 'select');
select pg_get_functiondef('ggircs_portal_private.get_valid_applications_via_certification_url()'::regprocedure);

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'certification_url', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'certification_url', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'certification_url', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'certification_url', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'certification_url', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('update', 'certification_url', 'ciip_industry_user',
  ARRAY['certification_signature', 'certifier_url', 'recertification_request_sent', 'certification_request_sent_to']);

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_certification_url', 'certification_url', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_certification_url', 'certification_url', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_certification_url', 'certification_url', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_certification_url', 'certification_url', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_certification_url', 'certification_url', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('update', 'ciip_industry_user_update_certification_url', 'certification_url', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
