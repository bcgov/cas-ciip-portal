-- Deploy ggircs-portal:policies/facility_policies_001 to pg
-- requires: policies/facility_policies

BEGIN;

drop policy certifier_select_facility on ggircs_portal.facility;
drop function ggircs_portal_private.get_valid_facility_for_certifier;

COMMIT;
