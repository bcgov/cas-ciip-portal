-- Revert ggircs-portal:tables/facility_001 from pg

begin;

drop index facility_swrs_facility_id_uindex;

commit;
