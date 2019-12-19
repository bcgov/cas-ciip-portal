-- Deploy ggircs-portal:view_ciip_incentive_payment to pg
-- requires: view_ciip_production
-- requires: view_ciip_emission
-- requires: table_benchmark

begin;

create or replace view ggircs_portal.ciip_incentive_payment as (
  -- The sum of non-biogenic emissions reported in an application.
  -- This includes all emissions except the CO2 gas type (Carbon dioxide from biomass not listed in Schedule C of GGERR)
  with ciip_non_bio_emission as (
    select sum(annual_co2e) as annual_co2e, application_id, version_number
    from ggircs_portal.ciip_emission
    where gas_type != 'CO2'
    group by application_id, version_number
  ),
  -- The energy balance is
  energy_balance as (
    select elec.application_id, elec.version_number,
    case when elec.generated_onsite=0 then 0
      else least(0, elec.purchased * elec.purchased_emission_factor + elec.sold * elec.onsite_emissions / elec.generated_onsite)
    end as electricity_balance,
    case when heat.generated_onsite=0 then 0
      else least(0, heat.purchased * heat.purchased_emission_factor + heat.sold * heat.onsite_emissions / heat.generated_onsite)
    end as heat_balance
    from ggircs_portal.application_revision
    join ggircs_portal.ciip_electricity_and_heat elec on
      elec.application_id = application_revision.application_id and
      elec.version_number = application_revision.version_number and
      elec.energy_type = 'electricity'
    join ggircs_portal.ciip_electricity_and_heat heat on
      heat.application_id = application_revision.application_id and
      heat.version_number = application_revision.version_number and
      heat.energy_type = 'heat'
  ),
  facility_carbon_tax as (
    select application_id, version_number, sum(carbon_tax_applicable_to_ciip) as carbon_tax_applicable_to_ciip
    from ggircs_portal.ciip_carbon_tax_calculation
    group by application_id, version_number
  ),
  emission_intensity as (
    select ciip_production.application_id, ciip_production.version_number, ciip_production.product_id,
    ((ciip_non_bio_emission.annual_co2e + energy_balance.electricity_balance + energy_balance.heat_balance) * (ciip_production.production_allocation_factor / 100) / ciip_production.quantity) as emission_intensity
    from ggircs_portal.ciip_production
    join ggircs_portal.benchmark on ciip_production.product_id = benchmark.product_id and benchmark.excludes_exported_energy = true
    join ciip_non_bio_emission on ciip_production.application_id = ciip_non_bio_emission.application_id
    join energy_balance on ciip_production.application_id = energy_balance.application_id
  union
    select ciip_production.application_id, ciip_production.version_number, ciip_production.product_id,
    (ciip_non_bio_emission.annual_co2e * (ciip_production.production_allocation_factor / 100) / ciip_production.quantity) as emission_intensity
    from ggircs_portal.ciip_production
    join ggircs_portal.benchmark on ciip_production.product_id = benchmark.product_id and benchmark.excludes_exported_energy = false
    join ciip_non_bio_emission on ciip_production.application_id = ciip_non_bio_emission.application_id
  )
  select
    ciip_production.application_id,
    ciip_production.version_number,
    ciip_production.product_id,
    emission_intensity.emission_intensity,
  round(((
    greatest(0, least(1, 1 - (emission_intensity.emission_intensity - benchmark.benchmark))) / (benchmark.eligibility_threshold - benchmark.benchmark)
  ) * benchmark.incentive_multiplier * (ciip_production.payment_allocation_factor/100) * facility_carbon_tax.carbon_tax_applicable_to_ciip), 2) as incentive_amount
  from ggircs_portal.ciip_production
  join facility_carbon_tax on
    ciip_production.application_id = facility_carbon_tax.application_id and
    ciip_production.version_number = facility_carbon_tax.version_number
  join ggircs_portal.benchmark on ciip_production.product_id = benchmark.product_id -- TODO: handle benchmark history
  join emission_intensity on ciip_production.application_id = emission_intensity.application_id and ciip_production.product_id = emission_intensity.product_id

);

comment on view ggircs_portal.ciip_incentive_payment is '
@primaryKey application_id, version_number, product_id
@foreignKey (application_id, version_number) references ggircs_portal.application_revision (application_id, version_number)
@foreignKey (product_id) references ggircs_portal.product (id)
The view that calculates the estimated incentive payment for each product of an application revision';
comment on column ggircs_portal.ciip_incentive_payment.application_id is 'The application id';
comment on column ggircs_portal.ciip_incentive_payment.version_number is 'The revision version number';
comment on column ggircs_portal.ciip_incentive_payment.product_id is 'The id of the product';
comment on column ggircs_portal.ciip_incentive_payment.emission_intensity is 'The emission intensity for this product, measured in tonnes of CO2 equivalent per unit of production';
comment on column ggircs_portal.ciip_incentive_payment.incentive_amount is 'The amount, in canadian dollars, of incentive to be payed back for this product';

commit;
