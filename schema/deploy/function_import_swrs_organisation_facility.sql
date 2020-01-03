-- Deploy ggircs-portal:function_import_swrs_organisation_facility to pg

begin;

create or replace function ggircs_portal.import_swrs_organisation_facility()
returns void as $function$
begin
  with latest_reporting_period as (
    select organisation.swrs_organisation_id, max(reporting_period_duration) as last_reporting_period
    from swrs.organisation
    join swrs.report on organisation.report_id = report.id
    group by organisation.swrs_organisation_id
  ),
  latest_reports as (
    -- Pick the report from the latest reporting year that was inserted last
    -- This applies if there are multiple facilities per organisation
    -- The organisation data is expected to be the same for both facilities.
    select max(id) as id, report.swrs_organisation_id from swrs.report
      join latest_reporting_period
        on report.swrs_organisation_id = latest_reporting_period.swrs_organisation_id
        and report.reporting_period_duration = latest_reporting_period.last_reporting_period
    group by report.swrs_organisation_id
  )
  insert into ggircs_portal.organisation(report_id, swrs_report_id, swrs_organisation_id, operator_name, cra_business_number)
  (
    select report_id, swrs_report_id,
           swrs.organisation.swrs_organisation_id,
           business_legal_name, cra_business_number from swrs.organisation
    join latest_reports on report_id = latest_reports.id
    join swrs.report on organisation.report_id = report.id
  ) on conflict(swrs_report_id) do update
  set report_id = excluded.report_id,
      swrs_organisation_id = excluded.swrs_organisation_id,
      operator_name = excluded.operator_name,
      cra_business_number = excluded.cra_business_number;

  with latest_reporting_period as (
    select facility.swrs_facility_id, max(reporting_period_duration) as last_reporting_period
    from swrs.facility
      join swrs.report on facility.report_id = report.id
    group by facility.swrs_facility_id
  ),
  latest_reports as (
    select id from swrs.report
      join latest_reporting_period
        on report.swrs_facility_id = latest_reporting_period.swrs_facility_id
        and report.reporting_period_duration = latest_reporting_period.last_reporting_period
  )
  insert into ggircs_portal.facility
  (
    organisation_id,
    report_id,
    swrs_report_id,
    swrs_facility_id,
    facility_name,
    facility_type,
    bcghgid
  )
  (
    select ggircs_portal.organisation.id,
           swrs.report.id,
           swrs.report.swrs_report_id,
           swrs.facility_details.swrs_facility_id,
           swrs.facility_details.facility_name,
           swrs.facility_details.facility_type,
           swrs.facility_details.identifier_value
    from swrs.facility_details
    join latest_reports on report_id = latest_reports.id
    join swrs.report on facility_details.report_id = report.id
    join ggircs_portal.organisation on ggircs_portal.organisation.swrs_organisation_id = swrs.report.swrs_organisation_id
  ) on conflict(swrs_report_id) do update
  set organisation_id = excluded.organisation_id,
      report_id = excluded.report_id,
      swrs_facility_id = excluded.swrs_facility_id,
      facility_name = excluded.facility_name,
      facility_type = excluded.facility_type,
      bcghgid = excluded.bcghgid;
end;
$function$ language plpgsql strict volatile;

commit;
