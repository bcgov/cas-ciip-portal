-- Verify ggircs-portal:policies/ciip_user_organisation_policies_003_remove_enum_operator_dependency on pg

begin;

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_ciip_user_organisation', 'ciip_user_organisation', 'ciip_industry_user');

rollback;
