-- Deploy ggircs-portal:queries/facility_application_by_reporting_year to pg

begin;

create type ggircs_portal.facility_application as (
  facility_id int,
  organisation_id int,
  application_id int,
  operator_name varchar(1000),
  facility_name varchar(1000),
  facility_type varchar(1000),
  facility_bcghgid varchar(1000),
  swrs_facility_id int,
  reporting_year int
);

comment on type ggircs_portal.facility_application is E'@primaryKey facility_id,reporting_year\n@foreignKey (application_id) references ggircs_portal.application (id)\n@foreignKey (facility_id) references ggircs_portal.facility (id)';

create or replace function ggircs_portal.facility_application_by_reporting_year(_reporting_year int)
  returns setof ggircs_portal.facility_application
  as $$
    select facility.id, organisation.id, application.id,
      organisation.operator_name, facility.facility_name, facility.facility_type, facility.bcghgid,
      facility.swrs_facility_id, _reporting_year
    from ggircs_portal.facility
    left join ggircs_portal.application
      on facility.id = application.facility_id
      and application.reporting_year = _reporting_year
    join ggircs_portal.organisation on facility.organisation_id = organisation.id;
  $$ language 'sql' stable;

grant execute on function ggircs_portal.facility_application_by_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user;

create or replace function ggircs_portal.facility_application_application_status(facility_application ggircs_portal.facility_application)
  returns ggircs_portal.ciip_application_revision_status
  as $$
    select (ggircs_portal.application_application_revision_status((select row(application.*)::ggircs_portal.application from ggircs_portal.application where id = facility_application.application_id), null)).application_revision_status;
  $$ language sql stable;

grant execute on function ggircs_portal.facility_application_application_status to ciip_administrator, ciip_analyst, ciip_industry_user;

create or replace function ggircs_portal.facility_application_last_swrs_reporting_year(facility_application ggircs_portal.facility_application)
  returns int
  as $$
    select max(reporting_period_duration) from swrs.report where swrs_facility_id = facility_application.swrs_facility_id ;
  $$ language sql stable;

grant execute on function ggircs_portal.facility_application_last_swrs_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
