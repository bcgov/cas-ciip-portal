-- Deploy ggircs-portal:materialized_view_estimated_carbon_tax_paid to pg

BEGIN;

CREATE MATERIALIZED VIEW ggircs_portal.estimated_carbon_tax_paid as (
  select
     ctp.*,
     idn.identifier_value as bcghgid,
     rp.reporting_period_duration
  from swrs.carbon_tax_calculation as ctp
  inner join swrs.report as rp on rp.id =  ctp.report_id
  inner join swrs.identifier as idn on ctp.facility_id = idn.facility_bcghgid_id
);

COMMIT;
