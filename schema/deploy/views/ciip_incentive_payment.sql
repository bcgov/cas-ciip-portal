-- Deploy ggircs-portal:view_ciip_incentive_payment to pg
-- requires: view_ciip_production
-- requires: view_ciip_emission
-- requires: table_benchmark

begin;

create or replace view ggircs_portal.ciip_incentive_payment as (
  -- The emission allocation factor reported in the CIIP production is the ratio of the facility's non-biogenic emissions
  -- This includes all emissions except the 'CO2' gas type (Carbon dioxide from biomass not listed in Schedule C of GGERR)
  with ciip_non_bio_emission as (
    select sum(annual_co2e) as annual_co2e, application_id, version_number
    from ggircs_portal.ciip_emission
    where gas_type != 'CO2'
    group by application_id, version_number
  ),
  -- Indirect emissions associated to energy imported into the facility need to be accounted for/included in the total facility emissions.
  -- Accordingly, energy exported outside the facility boundaries needs to be excluded from the facility emissions (as it is not used on site)
  -- This approach is aligned with GHG protocol's Scope 2 guidance: https://ghgprotocol.org/scope_2_guidance
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
    select
      application_id, version_number,
      sum(carbon_tax_eligible_for_ciip_flat) as carbon_tax_eligible_for_ciip_flat,
      sum(carbon_tax_eligible_for_ciip_pro_rated) as carbon_tax_eligible_for_ciip_pro_rated
    from ggircs_portal.ciip_carbon_tax_calculation
    group by application_id, version_number
  ),
  -- The emission_intensity is the ratio of emissions allocated to the product over the produced amount
  -- If the product's benchmark excludes the exported energy (see above), then it has to be removed from the facility emission
  emission_intensity as (
    select ciip_production.application_id, ciip_production.version_number, ciip_production.product_id,
    (ciip_production.product_emissions / ciip_production.quantity) as emission_intensity
    from ggircs_portal.ciip_production
    join ggircs_portal.benchmark on ciip_production.product_id = benchmark.product_id and benchmark.includes_imported_energy = true
    join ciip_non_bio_emission on ciip_production.application_id = ciip_non_bio_emission.application_id
    join energy_balance on ciip_production.application_id = energy_balance.application_id
  union
    select ciip_production.application_id, ciip_production.version_number, ciip_production.product_id,
    (ciip_production.product_emissions / ciip_production.quantity) as emission_intensity
    from ggircs_portal.ciip_production
    join ggircs_portal.benchmark on ciip_production.product_id = benchmark.product_id and benchmark.includes_imported_energy = false
    join ciip_non_bio_emission on ciip_production.application_id = ciip_non_bio_emission.application_id
  )
  select
    ciip_production.application_id,
    ciip_production.version_number,
    ciip_production.product_id,
    round(emission_intensity.emission_intensity, 6) as emission_intensity,
    benchmark.id as benchmark_id,
    round((ciip_production.payment_allocation_factor/100) * facility_carbon_tax.carbon_tax_eligible_for_ciip_flat, 2) as carbon_tax_eligible_flat,
    round((ciip_production.payment_allocation_factor/100) * facility_carbon_tax.carbon_tax_eligible_for_ciip_pro_rated, 2) as carbon_tax_eligible_pro_rated,
    round((
      greatest(
        0,
      least(
        1,
        (1 - (emission_intensity.emission_intensity - benchmark.benchmark) / (benchmark.eligibility_threshold - benchmark.benchmark))
      ))
      * benchmark.incentive_multiplier
      * (ciip_production.payment_allocation_factor/100)
      * facility_carbon_tax.carbon_tax_eligible_for_ciip_flat
    )::numeric, 2) as incentive_amount_flat,
    round((
      greatest(
        0,
      least(
        1,
        (1 - (emission_intensity.emission_intensity - benchmark.benchmark) / (benchmark.eligibility_threshold - benchmark.benchmark))
      ))
      * benchmark.incentive_multiplier
      * (ciip_production.payment_allocation_factor/100)
      * facility_carbon_tax.carbon_tax_eligible_for_ciip_pro_rated
    )::numeric, 2) as incentive_amount_pro_rated
  from ggircs_portal.ciip_production
  join facility_carbon_tax on
    ciip_production.application_id = facility_carbon_tax.application_id and
    ciip_production.version_number = facility_carbon_tax.version_number
  join ggircs_portal.benchmark on ciip_production.product_id = benchmark.product_id -- TODO: handle benchmark history
  join emission_intensity on ciip_production.application_id = emission_intensity.application_id and ciip_production.product_id = emission_intensity.product_id

);

grant select on table ggircs_portal.ciip_incentive_payment to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_incentive_payment is '
@primaryKey application_id, version_number, product_id
@foreignKey (application_id, version_number) references ggircs_portal.application_revision (application_id, version_number)
@foreignKey (product_id) references ggircs_portal.product (id)
@foreignKey (benchmark_id) references ggircs_portal.benchmark (id)
The view that calculates the estimated incentive payment for each product of an application revision';
comment on column ggircs_portal.ciip_incentive_payment.application_id is 'The application id';
comment on column ggircs_portal.ciip_incentive_payment.version_number is 'The revision version number';
comment on column ggircs_portal.ciip_incentive_payment.product_id is 'The id of the product';
comment on column ggircs_portal.ciip_incentive_payment.benchmark_id is 'The id of the benchmark';
comment on column ggircs_portal.ciip_incentive_payment.emission_intensity is 'The emission intensity for this product, measured in tonnes of CO2 equivalent per unit of production';
comment on column ggircs_portal.ciip_incentive_payment.carbon_tax_eligible_flat is 'The amount, in canadian dollars, of carbon tax eligible for incentive for this product (assuming a flat CT rate)';
comment on column ggircs_portal.ciip_incentive_payment.incentive_amount_flat is 'The amount, in canadian dollars, of incentive to be payed back for this product (assuming a flat CT rate)';
comment on column ggircs_portal.ciip_incentive_payment.carbon_tax_eligible_pro_rated is 'The amount, in canadian dollars, of carbon tax eligible for incentive for this product';
comment on column ggircs_portal.ciip_incentive_payment.incentive_amount_pro_rated is 'The amount, in canadian dollars, of incentive to be payed back for this product';

commit;
