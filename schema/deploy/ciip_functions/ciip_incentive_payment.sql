-- Deploy ggircs-portal:ciip_functions/ciip_incentive_payment to pg
-- requires: tables/benchmark
-- requires: views/ciip_production
-- requires: views/ciip_electricity_and_heat

begin;

-- Function takes application id and version number:
create or replace function ggircs_portal.ciip_incentive_payment(app_id int , version_no int )
returns setof ggircs_portal.ciip_incentive_by_product as $function$
  declare
    product record;
    em_facility numeric;
    em_product numeric;
    em_electricity numeric;
    em_heat numeric;
    em_intensity numeric;
    em_alloc_elec numeric;
    em_alloc_heat numeric;
    intensity_range numeric;
    incentive_ratio_max numeric;
    incentive_ratio_min numeric;
    incentive_ratio numeric;
    incentive_product numeric;
    carbon_tax_facility numeric;
    electricity_data ggircs_portal.ciip_electricity_and_heat;
    heat_data ggircs_portal.ciip_electricity_and_heat;
    benchmark_data ggircs_portal.benchmark;
    product_data ggircs_portal.product;
    product_return ggircs_portal.ciip_incentive_by_product;

  begin
     -- Define placeholder variables
     em_alloc_elec = 0;
     em_alloc_heat = 0;
     incentive_ratio_min = 0;
     incentive_ratio_max = 1;

     -- Get emissions for facility
     select sum(annual_co2e) into em_facility from ggircs_portal.ciip_emission
     where version_number = version_no and application_id = app_id;

     -- Get carbon tax data for the application
     select sum(carbon_tax_flat) into carbon_tax_facility from ggircs_portal.ciip_carbon_tax_calculation
     where version_number = version_no and application_id = app_id;

     -- Get electricity and heat data for the application
     select * into electricity_data from ggircs_portal.ciip_electricity_and_heat
     where version_number = version_no and application_id = app_id and energy_type = 'electricity';

     -- Get electricity and heat data for the application
     select * into heat_data from ggircs_portal.ciip_electricity_and_heat
     where version_number = version_no and application_id = app_id and energy_type = 'heat';

     -- Calculate emissions from electricity and heat
     em_electricity = electricity_data.purchased * coalesce(electricity_data.purchased_emission_factor,0);
     em_heat = heat_data.purchased * coalesce(heat_data.purchased_emission_factor,0);

     -- Loop over products
     for product in select * from ggircs_portal.ciip_production
                    where version_number = version_no and application_id = app_id
     loop

        -- Calculate Emissions for Product (EmProd)
        -- EmProd = EmFacility * EmAlloc(P,F) + EmImportedElec * EmAlloc(IE) + EmImportedHeat * EmAlloc(IH)
        em_product = (em_facility * product.production_allocation_factor/100)
                   + (em_electricity * em_alloc_elec)
                   + (em_heat * em_alloc_elec);

        -- Calculate Emission Intensity
        em_intensity = em_product / product.quantity;

        -- Get Incentive Ratio Max and Min, BM and ET for product from Benchmark table
        select * into benchmark_data from ggircs_portal.benchmark
        where product_id = product.product_id;

         -- Get Product specific data
        select * into product_data from ggircs_portal.product
        where id = product.product_id;

        -- Calculate Incentive Ratio as
        -- IncRatio = min(IncRatioMax, max(IncRatioMin, 1 - (EmIntensity - BM)/(ET - BM))
        intensity_range = 1 - ((em_intensity - benchmark_data.benchmark) / (benchmark_data.eligibility_threshold - benchmark_data.benchmark));
        incentive_ratio = least(incentive_ratio_max, greatest(incentive_ratio_min, intensity_range));

        -- Calculate Incentive Amount
        -- IncAmt = IncRatio * IncMult * PmntAlloc * CTFacility
        incentive_product = incentive_ratio *
                            benchmark_data.incentive_multiplier *
                            product.payment_allocation_factor/100 *
                            carbon_tax_facility;


        select into product_return
          product_data.name as product_name,
          incentive_ratio as incentive_ratio,
          benchmark_data.incentive_multiplier as incentive_multiplier,
          product.payment_allocation_factor/100 as payment_allocation_factor,
          carbon_tax_facility as carbon_tax,
          incentive_product as incentive_product,
          benchmark_data.benchmark as benchmark,
          benchmark_data.eligibility_threshold as eligibility_threshold;

        return next product_return;

     end loop;

  end

$function$ language plpgsql stable;

commit;
