-- Deploy ggircs-portal:tables/facility_001 to pg
-- requires: tables/facility

begin;

create unique index facility_swrs_facility_id_uindex on ggircs_portal.facility(swrs_facility_id);

commit;
