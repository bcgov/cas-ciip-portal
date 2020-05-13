-- Verify ggircs-portal:table_certification_url on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.certification_url', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'certification_url', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'certification_url', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'certification_url', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'certification_url', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'certification_url', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('update', 'certification_url', 'ciip_industry_user',
  ARRAY['certification_signature', 'certifier_url', 'recertification_request_sent', 'certifier_email', 'send_certification_request']);

-- ciip_guest Grants

rollback;
