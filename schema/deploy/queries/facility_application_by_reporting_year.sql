-- Deploy ggircs-portal:queries/facility_application_by_reporting_year to pg

begin;


create or replace function ggircs_portal.facility_application_by_reporting_year(_reporting_year int)
  returns setof ggircs_portal.facility_application
  as $$
  select * from (
    (select facility.id, organisation.id, application.id,
      organisation.operator_name, facility.facility_name, facility.facility_type, facility.bcghgid,
      facility.swrs_facility_id, _reporting_year as reporting_year
    from ggircs_portal.facility
    left join ggircs_portal.application
      on facility.id = application.facility_id
      and application.reporting_year = _reporting_year
    join ggircs_portal.organisation on facility.organisation_id = organisation.id
    where _reporting_year is not null)
    union
    (select facility.id, organisation.id, application.id,
      organisation.operator_name, facility.facility_name, facility.facility_type, facility.bcghgid,
      facility.swrs_facility_id, (select reporting_year from ggircs_portal.default_displayed_reporting_year()) as reporting_year
    from ggircs_portal.facility
    left join ggircs_portal.application
      on facility.id = application.facility_id
      and application.reporting_year = (select reporting_year from ggircs_portal.default_displayed_reporting_year())
    join ggircs_portal.organisation on facility.organisation_id = organisation.id
    where _reporting_year is null)
  ) sub order by operator_name, facility_name;
  $$ language 'sql' stable;

grant execute on function ggircs_portal.facility_application_by_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
