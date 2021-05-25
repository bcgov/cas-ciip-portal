-- Deploy ggircs-portal:application_validation_functions/carbon_taxed_fuels_match_rev_zero to pg
-- requires: tables/application_revision_validation_function
-- requires: computed_columns/fuel_is_carbon_taxed

begin;

create or replace function ggircs_portal.carbon_taxed_fuels_match_rev_zero(app_rev ggircs_portal.application_revision)
  returns boolean as
  $function$

    -- note: we could remove potential false-positives by filtering out the rows with a 0 quantity for some fuels
    -- on both ciip and swrs sides

    with
    swrs_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id = app_rev.application_id
      and version_number = 0
    ),
    ciip_fuel_totals as (
      select
        fuel.id as fuel_id, sum(ciip_fuel_data.quantity) as quantity
      from ggircs_portal.application_revision_fuel_form_data(app_rev) as ciip_fuel_data
      join ggircs_portal.fuel on ciip_fuel_data.fuel_id = fuel.id
      join ggircs_portal.emission_category ec on ec.id = ciip_fuel_data.emission_category_id
      where ggircs_portal.fuel_is_carbon_taxed(row(fuel.*)::ggircs_portal.fuel)
      -- Flaring and Venting emissions are not reported in SWRS at this time, and shouldn't be counted in the total
      and ec.swrs_emission_category not in ('BC_ScheduleB_FlaringEmissions', 'BC_ScheduleB_VentingEmissions')
      group by fuel.id
    ),
    swrs_fuel_totals as (
      select
        fuel.id as fuel_id, sum(swrs_fuel_data.quantity) as quantity
      from ggircs_portal.application_revision_fuel_form_data((select * from swrs_revision)) as swrs_fuel_data
      join ggircs_portal.fuel on swrs_fuel_data.fuel_id = fuel.id
      where ggircs_portal.fuel_is_carbon_taxed(row(fuel.*)::ggircs_portal.fuel)
      group by fuel.id
    ),
    -- full outer join the 2 ciip and swrs carbon-taxed fuel lists
    -- null values on either side mean the lists don't match up
    ciip_swrs_join as (
      select
        ciip_fuel_totals.fuel_id as ciip_fuel_id,
        ciip_fuel_totals.quantity as ciip_quantity,
        swrs_fuel_totals.fuel_id as swrs_fuel_id,
        swrs_fuel_totals.quantity as swrs_quantity
      from ciip_fuel_totals
      full outer join swrs_fuel_totals
      on ciip_fuel_totals.fuel_id = swrs_fuel_totals.fuel_id
      -- we exclude the rows with zero or zero/null ciip/swrs combinations
      where coalesce(ciip_fuel_totals.quantity, 0) != 0 or coalesce(swrs_fuel_totals.quantity, 0) != 0
    )
    select
      case
        when
          -- If the 2 swrs and ciip fuel lists don't match up we return false
          (
            select count(*) from ciip_swrs_join
            where ciip_fuel_id is null
            or swrs_fuel_id is null
          ) > 0 then false
        when
          -- If there are instances where the difference is > 0.01% we return false
          (
            with percentage_differences as (
              select abs(2 * (ciip_quantity - swrs_quantity) / (ciip_quantity + swrs_quantity)) as percentage_difference
              from ciip_swrs_join
            )
            select count(*) from percentage_differences where percentage_difference > 0.001
          ) > 0 then false
        else
          true
      end;



  $function$
language sql stable;

comment on function ggircs_portal.carbon_taxed_fuels_match_rev_zero(app_rev ggircs_portal.application_revision) is
'This validation function for a CIIP (CleanBC Industrial Incentive Program) application determines if the carbon-taxed fuels reported match the amounts reported in SWRS';

grant execute on function ggircs_portal.carbon_taxed_fuels_match_rev_zero to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
