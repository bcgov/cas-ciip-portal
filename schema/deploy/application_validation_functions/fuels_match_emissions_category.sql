-- Deploy ggircs-portal:application_validation_functions/fuels_match_emissions_category to pg

begin;

create or replace function ggircs_portal.fuels_match_emissions_category(app_revision ggircs_portal.application_revision)
  returns boolean
  as $$

  with fuel_data as (
    select * from ggircs_portal.application_revision_fuel_form_data(app_revision)
  ),
  fuels_by_emissions_category as (
    select * from ggircs_portal.fuel_ids_by_emission_category_id()
  ) select (
    select count(*) from fuel_data where fuel_data.fuel_id not in (select unnest(fuel_ids) from fuels_by_emissions_category where emission_category_id=fuel_data.emission_category_id)) = 0;

$$ language sql stable;

grant execute on function ggircs_portal.fuels_match_emissions_category to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.fuels_match_emissions_category(ggircs_portal.application_revision) is 'This validation function for a CIIP (CleanBC Industrial Incentive Program) application determines if any fuels have been reported under an emissions category that that fuel cannot be reported under.';

commit;
