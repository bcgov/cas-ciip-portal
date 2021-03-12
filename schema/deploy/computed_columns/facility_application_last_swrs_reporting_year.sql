-- Deploy ggircs-portal:computed_columns/facility_application_last_swrs_reporting_year to pg

begin;

create or replace function ggircs_portal.facility_application_last_swrs_reporting_year(facility_application ggircs_portal.facility_application)
  returns int
  as $$
    select max(reporting_period_duration) from swrs.report where swrs_facility_id = facility_application.swrs_facility_id ;
  $$ language sql stable;

grant execute on function ggircs_portal.facility_application_last_swrs_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
