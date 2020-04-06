-- Deploy ggircs-portal:computed_columns/ciip_incentive to pg
-- requires: tables/benchmark
-- requires: views/ciip_production
-- requires: views/ciip_electricity_and_heat

begin;
-- Function takes application id and version number:
create or replace function ggircs_portal.application_revision_ciip_incentive(application_revision ggircs_portal.application_revision)
returns setof ggircs_portal.ciip_incentive_by_product as $function$
  declare
    product record;
    em_facility numeric;
    em_product numeric;
    em_electricity numeric;
    em_heat numeric;
    em_intensity numeric;
    intensity_range numeric;
    incentive_ratio_max numeric;
    incentive_ratio_min numeric;
    incentive_ratio numeric;
    incentive_product numeric;
    app_reporting_year int;
    carbon_tax_facility numeric;
    payment_allocation_factor numeric; -- The portion of the facility's carbon tax allocated to the current product
    reported_ciip_products ggircs_portal.ciip_production[]; -- The reported ciip products (excludes product with no incentive)
    benchmark_data ggircs_portal.benchmark;
    product_data ggircs_portal.product;
    product_return ggircs_portal.ciip_incentive_by_product;

  begin
    -- TODO: Check that there is only a single product where requires_emission_allocation is false, we can't do the payment allocation otherwise

    -- Define placeholder variables
    incentive_ratio_min = 0;
    incentive_ratio_max = 1;

    -- Get emissions for facility
    select sum(annual_co2e) into em_facility from ggircs_portal.ciip_emission
    where version_number = application_revision.version_number and application_id = application_revision.application_id and gas_type != 'CO2';

    -- Get reporting year for application
    select reporting_year into app_reporting_year from ggircs_portal.application
    where id = application_revision.application_id;

    -- Get carbon tax data for the application
    select sum(carbon_tax_flat) into carbon_tax_facility from ggircs_portal.ciip_carbon_tax_calculation
    where version_number = application_revision.version_number and application_id = application_revision.application_id;
    reported_ciip_products = array(
      select row(ciip_production.*)
      from ggircs_portal.ciip_production
      join ggircs_portal.product _product on ciip_production.product_id = _product.id and _product.is_ciip_product = true
      where version_number = application_revision.version_number and application_id = application_revision.application_id
    );

    if (select array_length(reported_ciip_products, 1)) > 0 then
      -- Loop over products
      foreach product in array reported_ciip_products
      loop
         -- Get Product specific data
        select * into product_data from ggircs_portal.product
        where id = product.product_id;

        -- Get Incentive Ratio Max and Min, BM and ET for product from Benchmark table
        select * into benchmark_data from ggircs_portal.benchmark
          where product_id = product.product_id
          and start_reporting_year <= app_reporting_year
          and end_reporting_year >= app_reporting_year;

        -- Calculate Emissions for Product (EmProd)
        if (product_data.requires_emission_allocation) then
          em_product = product.product_emissions;
        else
          em_product = em_facility; -- TODO: add/subtract energy
        end if;

        -- Calculate Emission Intensity
        em_intensity = em_product / product.product_amount;


        -- Calculate Incentive Ratio as
        -- IncRatio = min(IncRatioMax, max(IncRatioMin, 1 - (EmIntensity - BM)/(ET - BM))
        intensity_range = 1 - ((em_intensity - benchmark_data.benchmark) / (benchmark_data.eligibility_threshold - benchmark_data.benchmark));
        incentive_ratio = least(incentive_ratio_max, greatest(incentive_ratio_min, intensity_range));

        -- Determine the payment allocation factor.
        if (select array_length(reported_ciip_products, 1)) = 1 then
          payment_allocation_factor = 1;
        else
          payment_allocation_factor = em_product / (select sum(p.product_emissions) from unnest(reported_ciip_products) p) ;
        end if;


        -- Calculate Incentive Amount
        -- IncAmt = IncRatio * IncMult * PmntAlloc * CTFacility
        -- 0 if no benchmark exists
        incentive_product = coalesce (incentive_ratio *
                            benchmark_data.incentive_multiplier *
                            payment_allocation_factor *
                            carbon_tax_facility, 0);

        select into product_return
          row_number() over () as id,
          product_data.id as product_id,
          product_data.name as product_name,
          incentive_ratio as incentive_ratio,
          benchmark_data.incentive_multiplier as incentive_multiplier,
          payment_allocation_factor,
          carbon_tax_facility as carbon_tax,
          incentive_product as incentive_product,
          em_intensity as emission_intensity,
          benchmark_data.benchmark as benchmark,
          benchmark_data.eligibility_threshold as eligibility_threshold;

        return next product_return;

      end loop;
    end if;
  end

$function$ language plpgsql stable;

grant execute on function ggircs_portal.application_revision_ciip_incentive to ciip_administrator, ciip_analyst;

comment on function ggircs_portal.application_revision_ciip_incentive is 'Computed column for graphql to get the ciip incentive calculations from application_revision';

commit;
