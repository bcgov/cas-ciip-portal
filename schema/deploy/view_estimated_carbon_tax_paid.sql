-- Deploy ggircs-portal:view_estimated_carbon_tax_paid to pg

begin;

-- TODO(wenzowski): remove cross-schema references
create schema if not exists swrs;
create table if not exists swrs.carbon_tax_calculation (id int, report_id int, facility_id int);
create table if not exists swrs.report (id int, reporting_period_duration text);
create table if not exists swrs.identifier (facility_bcghgid_id int, identifier_value text);
-- ^ none of this hacky crap should be here

create view ggircs_portal.estimated_carbon_tax_paid as (
  select
     ctp.*,
     idn.identifier_value as bcghgid,
     rp.reporting_period_duration
  from swrs.carbon_tax_calculation as ctp
  inner join swrs.report as rp on rp.id = ctp.report_id
  inner join swrs.identifier as idn on ctp.facility_id = idn.facility_bcghgid_id
);

commit;
