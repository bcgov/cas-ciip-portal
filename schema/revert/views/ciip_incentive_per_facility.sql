-- Revert ggircs-portal:views/ciip_incentive_per_facility from pg

begin;

drop view ggircs_portal.ciip_incentive_per_facility;

commit;
