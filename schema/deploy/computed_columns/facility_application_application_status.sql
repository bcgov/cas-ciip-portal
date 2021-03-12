-- Deploy ggircs-portal:computed_columns/facility_application_application_status to pg

begin;

create or replace function ggircs_portal.facility_application_application_status(facility_application ggircs_portal.facility_application)
  returns ggircs_portal.ciip_application_revision_status
  as $$
    select (ggircs_portal.application_application_revision_status((select row(application.*)::ggircs_portal.application from ggircs_portal.application where id = facility_application.application_id), null)).application_revision_status;
  $$ language sql stable;

grant execute on function ggircs_portal.facility_application_application_status to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
