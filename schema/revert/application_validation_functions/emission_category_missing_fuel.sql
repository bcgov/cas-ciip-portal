-- Revert ggircs-portal:application_validation_functions/emission_category_missing_fuel from pg

begin;

create or replace function ggircs_portal.emission_category_missing_fuel(app_revision ggircs_portal.application_revision)
  returns boolean
  as $$

  with emissions as (
    select distinct(source_type_name) as reported_via_emission
    from ggircs_portal.application_revision_emission_form_data(app_revision) ed
    where ed.annual_co2e > 0
  ),
  fuel_data as (
    select * from ggircs_portal.application_revision_fuel_form_data(app_revision)
  ),
  fuels as (
    select distinct(display_name) as reported_via_fuel from ggircs_portal.emission_category ec
    join fuel_data
      on fuel_data.emission_category_id = ec.id
      and fuel_data.quantity > 0
  ) select (select count(*) from emissions where reported_via_emission not in (select reported_via_fuel from fuels)) = 0;

$$ language sql stable;

grant execute on function ggircs_portal.emission_category_missing_fuel to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.emission_category_missing_fuel(ggircs_portal.application_revision) is 'This validation function for a CIIP (CleanBC Industrial Incentive Program) application determines if any emission categories have emissions reported in a category, but no corresponding fuels reported for that category';

commit;
