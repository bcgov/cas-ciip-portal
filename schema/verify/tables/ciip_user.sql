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

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_ciip_user', 'ciip_user', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_ciip_user', 'ciip_user', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_ciip_user', 'ciip_user', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_ciip_user', 'ciip_user', 'ciip_analyst');
select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_ciip_user', 'ciip_user', 'ciip_analyst');
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_ciip_user', 'ciip_user', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_ciip_user', 'ciip_user', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_ciip_user', 'ciip_user', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('update', 'ciip_industry_user_update_ciip_user', 'ciip_user', 'ciip_industry_user');

-- ciip_guest Policies


rollback;
