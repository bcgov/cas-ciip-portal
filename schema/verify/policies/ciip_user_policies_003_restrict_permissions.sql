-- Verify ggircs-portal:policies/ciip_user_policies_003_restrict_permissions on pg

begin;

select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_ciip_user', 'ciip_user', 'ciip_industry_user');

rollback;
