-- Deploy ggircs-portal:views/ciip_incentive_per_facility to pg

begin;
  create or replace view ggircs_portal.ciip_incentive_per_facility as (

    with latest_submitted_version as (
      select application_id, max(version_number) as version_number
      from ggircs_portal.application_revision_status
      where application_revision_status='submitted'
      group by application_id
    ),
    application_incentives as (
      select
        ar.application_id,
        ar.version_number,
        ggircs_portal.application_revision_ciip_incentive(row(ar.*)::ggircs_portal.application_revision) as revision_incentive
      from latest_submitted_version
      join ggircs_portal.application_revision ar
      on ar.application_id = latest_submitted_version.application_id
      and ar.version_number = latest_submitted_version.version_number
    )
    select
      aggregated_incentives.application_id,
      aggregated_incentives.version_number,
      application.reporting_year,
      facility.id as facility_id,
      facility.facility_name,
      organisation.id as operator_id,
      organisation.operator_name,
      calculated_incentive,
      maximum_incentive,
      case
        when maximum_incentive = 0 then 0
        else calculated_incentive/maximum_incentive
      end as incentive_ratio
    from
    -- we use a subquery to avoid having to do the sum(...) twice for the total incentive ratio
    (select application_id,
        version_number,
        sum((revision_incentive).incentive_product) as calculated_incentive,
        sum((revision_incentive).incentive_product_max) as maximum_incentive
        from application_incentives
        group by application_id, version_number) as aggregated_incentives
    join ggircs_portal.application application on application.id=aggregated_incentives.application_id
    join ggircs_portal.facility facility on application.facility_id=facility.id
    join ggircs_portal.organisation on facility.organisation_id=organisation.id

 );

grant select on table ggircs_portal.ciip_incentive_per_facility to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_incentive_per_facility is E'@omit\n The view for calculating carbon tax based on ciip data';
comment on column ggircs_portal.ciip_incentive_per_facility.application_id is 'The application id';
comment on column ggircs_portal.ciip_incentive_per_facility.version_number is 'The version number';
comment on column ggircs_portal.ciip_incentive_per_facility.reporting_year is 'The reporting year for that application';
comment on column ggircs_portal.ciip_incentive_per_facility.facility_id is 'The facility id for that application';
comment on column ggircs_portal.ciip_incentive_per_facility.facility_name is 'The facility name for that application';
comment on column ggircs_portal.ciip_incentive_per_facility.operator_id is 'The operator id for that application';
comment on column ggircs_portal.ciip_incentive_per_facility.operator_name is 'The operator name for that application';
comment on column ggircs_portal.ciip_incentive_per_facility.calculated_incentive is 'The total calculated incentive for that application';
comment on column ggircs_portal.ciip_incentive_per_facility.maximum_incentive is 'The total maximum incentive for that application';
comment on column ggircs_portal.ciip_incentive_per_facility.incentive_ratio is 'The aggregated incentive ratio for that application';

commit;
