-- Deploy ggircs-portal:computed_columns/application_revision_carbon_tax to pg

begin;

create or replace function ggircs_portal.application_revision_carbon_tax(ggircs_portal.application_revision)
returns setof ggircs_portal.application_revision_fuel_carbon_tax
as $function$
  select
  $1.application_id, $1.version_number,
  fuel_data.fuel_id, fuel_data.emission_category_id::int,
  fuel_data.quantity,
  (fuel_data.quantity * fctd.unit_conversion_factor * reporting_fuel_charge.fuel_charge),
  greatest(0,
    (fuel_data.quantity * fctd.unit_conversion_factor * reporting_fuel_charge.fuel_charge)
  - (fuel_data.quantity * fctd.unit_conversion_factor * coalesce(baseline.fuel_charge_baseline, pre_increase_fuel_charge.fuel_charge))
  ), -- some fuels may have actually decreased in price due to a change of methodology, so in that case the part eligible for CIIP should be $0
  reporting_fuel_charge.fuel_charge,
  coalesce(baseline.fuel_charge_baseline, pre_increase_fuel_charge.fuel_charge) -- Use the baseline fuel charge for the reporting year if it exists, otherwise use the 2018 pre-increase fuel charge
  from ggircs_portal.application_revision_fuel_form_data($1) as fuel_data
  join ggircs_portal.application on application.id = $1.application_id
  join ggircs_portal.reporting_year on reporting_year.reporting_year = application.reporting_year
  join ggircs_portal.fuel on fuel.id = fuel_data.fuel_id
  join swrs.fuel_mapping fm on fuel.swrs_fuel_mapping_id = fm.id
  join swrs.fuel_carbon_tax_details fctd on fm.fuel_carbon_tax_details_id = fctd.id
  -- non-carbon-taxed fuels are filtered out in the following joins
  join ggircs_portal.emission_category ec
    on fuel_data.emission_category_id = ec.id
    and ec.carbon_taxed = true
  join swrs.fuel_charge reporting_fuel_charge
    on reporting_fuel_charge.carbon_tax_act_fuel_type_id = fctd.carbon_tax_act_fuel_type_id
    and reporting_year.reporting_period_end >= reporting_fuel_charge.start_date -- we use the rate applicable at the end of the reporting period
    and reporting_year.reporting_period_end <= reporting_fuel_charge.end_date
  left join ggircs_portal.incremental_fuel_charge_baseline baseline -- retrieve the baseline fuel charge relating to the application's reporting_year if it exists
    on baseline.carbon_tax_act_fuel_type_id = fctd.carbon_tax_act_fuel_type_id
    and reporting_year.reporting_year between baseline.start_reporting_period and baseline.end_reporting_period
  join swrs.fuel_charge pre_increase_fuel_charge
    on pre_increase_fuel_charge.carbon_tax_act_fuel_type_id = fctd.carbon_tax_act_fuel_type_id
    and '2018-03-31' >= pre_increase_fuel_charge.start_date -- the carbon tax increase started on April 1st 2018
    and '2018-03-31' <= pre_increase_fuel_charge.end_date;
$function$ language sql stable;


grant execute on function ggircs_portal.application_revision_carbon_tax to ciip_administrator, ciip_analyst;

comment on function ggircs_portal.application_revision_carbon_tax is 'Returns a set of application_revision_fuel_carbon_tax containing the estimated carbon tax paid and the amount eligible to CIIP for each fuel';

commit;
