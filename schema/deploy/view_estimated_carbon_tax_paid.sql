-- Deploy ggircs-portal:view_estimated_carbon_tax_paid to pg

begin;

-- TODO(wenzowski): remove cross-schema references

create view ggircs_portal.estimated_carbon_tax_paid as (
  select
     ctp.*,
     idn.identifier_value as bcghgid,
     rp.reporting_period_duration
  from swrs.carbon_tax_calculation as ctp
  inner join swrs.report as rp on rp.id = ctp.report_id
  inner join swrs.identifier as idn on ctp.facility_id = idn.facility_bcghgid_id
);

comment on view ggircs_portal.estimated_carbon_tax_paid is 'The estimated carbon tax paid for a reporting_period_duration';

commit;
