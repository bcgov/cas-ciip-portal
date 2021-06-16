-- Deploy ggircs-portal:views/ciip_incentive_per_facility to pg

begin;
  create or replace view ggircs_portal.ciip_incentive_per_facility as (

 );

grant select on table ggircs_portal.ciip_incentive_per_facility to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_incentive_per_facility is 'The view for calculating carbon tax based on ciip data';

commit;
