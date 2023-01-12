-- Verify ggircs-portal:policies/ciip_user_organisation_policies_002_recreate_after_type_change on pg

begin;

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_ciip_user_organisation', 'ciip_user_organisation', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_ciip_user_organisation', 'ciip_user_organisation', 'ciip_industry_user');

rollback;
