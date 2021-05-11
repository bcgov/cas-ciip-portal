-- Deploy ggircs-portal:computed_columns/fuel_is_carbon_taxed to pg
-- requires: tables/fuel_001

begin;

create or replace function ggircs_portal.fuel_is_carbon_taxed(f ggircs_portal.fuel)
  returns boolean
  as $$
    select exists(
      select 1
      from swrs.fuel_mapping fm
      join swrs.fuel_carbon_tax_details fctd
        on fm.fuel_carbon_tax_details_id = fctd.id
        and fctd.carbon_tax_act_fuel_type_id is not null
      where f.swrs_fuel_mapping_id = fm.id
    );
  $$ language sql stable;

grant execute on function ggircs_portal.fuel_is_carbon_taxed to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.fuel_is_carbon_taxed(ggircs_portal.fuel) is 'Computed column returns true if the fuel is carbon taxed, false otherwise.';

commit;
