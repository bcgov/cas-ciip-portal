-- Verify ggircs-portal:table_user on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_user', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'ciip_user', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'ciip_user', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'ciip_user', 'ciip_administrator',
  ARRAY['first_name', 'last_name', 'email_address', 'occupation', 'phone_number', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by']);

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'ciip_user', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'ciip_user', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'ciip_user', 'ciip_analyst',
  ARRAY['first_name', 'last_name', 'email_address', 'occupation', 'phone_number', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by']);

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'ciip_user', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'ciip_user', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('update', 'ciip_user', 'ciip_industry_user',
  ARRAY['first_name', 'last_name', 'email_address', 'occupation', 'phone_number', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by']);

-- ciip_guest Grants
select ggircs_portal_private.verify_grant('select', 'ciip_user', 'ciip_guest');

rollback;
