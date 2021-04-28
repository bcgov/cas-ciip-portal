-- Deploy ggircs-portal:application_validation_functions/emission_category_missing_fuel to pg
-- requires: tables/application_revision_validation_function
-- requires: computed_columns/application_revision_validation

begin;

create or replace function ggircs_portal.emission_category_missing_fuel(app_revision ggircs_portal.application_revision)
  returns boolean
  as $$

  with x as (
    select distinct(source_type_name) as reported_via_emission
    from ggircs_portal.ciip_emission ce
    where ce.application_id = app_revision.application_id
    and ce.version_number = app_revision.version_number
    and ce.annual_co2e > 0
  ), y as (
    select distinct(display_name) as reported_via_fuel from ggircs_portal.emission_category ec
    join ggircs_portal.ciip_fuel cf
    on cf.emission_category_id = ec.id
    and cf.application_id = app_revision.application_id
    and cf.version_number = app_revision.version_number
    and cf.quantity > 0
  ) select (select count(*) from x where reported_via_emission not in (select reported_via_fuel from y)) = 0;

$$ language sql stable;

grant execute on function ggircs_portal.emission_category_missing_fuel to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on function ggircs_portal.emission_category_missing_fuel(ggircs_portal.application_revision) is 'This validation function for a CIIP (CleanBC Industrial Incentive Program) application determines if any emission categories have emissions reported in a category, but no corresponding fuels reported for that category';

insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message)
values (
  'emission_category_missing_fuel',
  'determines if any emission categories have emissions reported in a category, but no corresponding fuels reported for that category',
  'no fuels, ya screwed up!'
);

commit;
