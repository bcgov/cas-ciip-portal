create or replace function ggircs_portal.facility_application_last_swrs_reporting_year(facility_application ggircs_portal.facility_application)
  returns int
  as $$
    select least(
      (select max(reporting_period_duration) from swrs.report where swrs_facility_id = facility_application.swrs_facility_id),
      (select reporting_year::int from ggircs_portal.opened_reporting_year())
    );
  $$ language sql stable;
