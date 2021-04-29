-- Deploy ggircs-portal:computed_columns/application_revision_facility_emission to pg
-- requires: tables/gas_001
-- requires: views/ciip_emission

begin;

-- Computed column returns the sum of (ciip) emissions for an application revision.
create or replace function ggircs_portal.application_revision_total_ciip_emissions(application_revision ggircs_portal.application_revision)
returns numeric
  as $$
    select sum(annual_co2e) as total_ciip_co2e_emissions from ggircs_portal.application_revision_emission_form_data(application_revision) ce
    join ggircs_portal.gas
    on ce.gas_type = gas.gas_type
    and gas.is_ciip_emission = true;
  $$ language sql stable;

grant execute on function ggircs_portal.application_revision_total_ciip_emissions to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_total_ciip_emissions is 'Computed column to retrieve the sum of ciip emissions reported for an application_revision';

commit;
