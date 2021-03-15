-- Verify ggircs-portal:policies/facility_policies_001 on pg

BEGIN;

select ggircs_portal_private.verify_policy_not_present('certifier_select_facility', 'ggircs_portal.facility');
select ggircs_portal_private.verify_function_not_present('ggircs_portal_private.get_valid_facility_for_certifier');

ROLLBACK;
