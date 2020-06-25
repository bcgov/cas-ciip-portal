-- Revert ggircs-portal:tables/facility_001 from pg

begin;

drop index ggircs_portal.facility_swrs_facility_id_uindex;

commit;
