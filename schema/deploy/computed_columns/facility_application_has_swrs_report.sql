-- Deploy ggircs-portal:computed_columns/facility_application_has_swrs_report to pg
-- requires: tables/application

begin;

create or replace function ggircs_portal.facility_application_has_swrs_report(ggircs_portal.facility_application)
  returns boolean
  as $$
    select exists(
      select id from swrs.report r
        where r.swrs_facility_id = $1.swrs_facility_id
        and r.reporting_period_duration = $1.reporting_year
    );
  $$ language sql stable;

grant execute on function ggircs_portal.facility_application_has_swrs_report to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
