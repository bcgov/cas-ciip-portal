-- Verify ggircs-portal:policies/facility_policies on pg

begin;


select pg_get_functiondef('ggircs_portal_private.get_valid_facility_organisation()'::regprocedure);

-- verification of policies is a unit test
select true;

rollback;
