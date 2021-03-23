-- Verify ggircs-portal:policies/certification_url_policies on pg

begin;

-- ciip_industry_user (certifier) Policies
select ggircs_portal_private.verify_policy_not_present('certifier_select_certification_url', 'ggircs_portal.certification_url');
select ggircs_portal_private.verify_policy_not_present('certifier_update_certification_url', 'ggircs_portal.certification_url');

rollback;
