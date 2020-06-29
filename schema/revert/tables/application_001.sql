-- Revert ggircs-portal:tables/application_001 from pg

begin;

drop index ggircs_portal.application_facility_year_uindex;

commit;
