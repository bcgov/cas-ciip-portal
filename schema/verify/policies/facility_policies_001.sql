-- Verify ggircs-portal:policies/facility_policies_001 on pg

BEGIN;

select ggircs_portal_private.verify_function_not_present('ggircs_portal_private.get_valid_facility_for_certifier');

-- verification of policies is a unit test
select true;

ROLLBACK;
