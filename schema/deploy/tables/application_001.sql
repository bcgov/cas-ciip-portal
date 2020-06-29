-- Deploy ggircs-portal:tables/application_001 to pg
-- requires: tables/application

begin;

create unique index application_facility_year_uindex on ggircs_portal.application(facility_id, reporting_year);

commit;
