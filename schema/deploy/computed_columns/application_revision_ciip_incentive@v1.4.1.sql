-- Deploy ggircs-portal:computed_columns/ciip_incentive to pg
-- requires: tables/benchmark
-- requires: views/ciip_production

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
    incentive_ratio numeric;
    incentive_product numeric;
    incentive_product_max numeric;
    app_reporting_year int;
    incremental_carbon_tax_facility numeric;
    payment_allocation_factor numeric; -- The portion of the facility's carbon tax allocated to the current product
    reported_products ggircs_portal.ciip_production[]; -- The reported products (ciip and non-ciip) for this application
    reported_ciip_products ggircs_portal.ciip_production[]; -- The reported ciip products for this application
    benchmark_data ggircs_portal.benchmark;
    product_data ggircs_portal.product;
    product_return ggircs_portal.ciip_incentive_by_product;
    non_energy_product_count integer;
    has_products boolean;

  begin

    -- Get emissions for facility
    select sum(annual_co2e) into em_facility from ggircs_portal.ciip_emission
    where version_number = application_revision.version_number and application_id = application_revision.application_id and gas_type != 'CO2';

    -- Get reporting year for application
    select reporting_year into app_reporting_year from ggircs_portal.application
    where id = application_revision.application_id;

    -- Get carbon tax data for the application
    select sum(carbon_tax_eligible_for_ciip_flat) into incremental_carbon_tax_facility from ggircs_portal.ciip_carbon_tax_calculation
    where version_number = application_revision.version_number and application_id = application_revision.application_id;

    reported_products = array(
      select row(ciip_production.*)
      from ggircs_portal.ciip_production
      where
        version_number = application_revision.version_number
        and application_id = application_revision.application_id
    );

    has_products := (select product_id from ggircs_portal.ciip_production  where
        version_number = application_revision.version_number
        and application_id = application_revision.application_id limit 1) is not null;

    -- This function contained raised exceptions that were causing a crash when combined with the ability to override errors.
    -- It will be re-introduced after some thought on how better to handle it.
    -- Validate that application is not missing any required energy products
    -- if has_products=true then
    --   perform ggircs_portal_private.validate_energy_products(reported_products);
    -- end if;

    -- ** Test for invalid number of products when a reported product.requires_emission_allocation = false ** --
    non_energy_product_count := (
      select count(*)
      from ggircs_portal.ciip_production
      where
        version_number = application_revision.version_number
        and application_id = application_revision.application_id
        and is_energy_product=false
    );

    -- This exception was causing a crash when combined with the ability to override errors.
    -- It will be re-introduced after some thought on how better to handle it.
    -- if (select count(*) from ggircs_portal.ciip_production
    --   where
    --     version_number = application_revision.version_number
    --     and application_id = application_revision.application_id
    --     and requires_emission_allocation = false) > 0
    --   and non_energy_product_count > 1
    -- then
    --   raise exception 'When a product has: requires_emission_allocation = false, only one reported product (excluding energy products) is allowed';
    -- end if;
    -- ** End test ** --

    reported_ciip_products = array(
      select row(ciip_production.*)
      from ggircs_portal.ciip_production
      join ggircs_portal.product _product on
        ciip_production.product_id = _product.id
        and _product.is_ciip_product = true
      where
        version_number = application_revision.version_number
        and application_id = application_revision.application_id
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
          em_product = em_facility;
          if product_data.add_purchased_electricity_emissions then
            em_product = em_product + coalesce((
              select p.product_emissions
              from unnest(reported_products) p
              join ggircs_portal.product _product on
                p.product_id = _product.id
                and _product.product_name = 'Purchased electricity'
            ), 0);
          end if;
          if product_data.subtract_exported_electricity_emissions then
            em_product = em_product - coalesce((
              select p.product_emissions
              from unnest(reported_products) p
              join ggircs_portal.product _product on
                p.product_id = _product.id
                and _product.product_name = 'Sold electricity'
            ), 0);
          end if;
          if product_data.add_purchased_heat_emissions then
            em_product = em_product + coalesce((
              select p.product_emissions
              from unnest(reported_products) p
              join ggircs_portal.product _product on
                p.product_id = _product.id
                and _product.product_name = 'Purchased heat'
            ), 0);
          end if;
          if product_data.subtract_exported_heat_emissions then
            em_product = em_product - coalesce((
              select p.product_emissions
              from unnest(reported_products) p
              join ggircs_portal.product _product on
                p.product_id = _product.id
                and _product.product_name = 'Sold heat'
            ), 0);
          end if;
          if product_data.add_emissions_from_eios then
            em_product = em_product + coalesce((
              select p.product_emissions
              from unnest(reported_products) p
              join ggircs_portal.product _product on
                p.product_id = _product.id
                and _product.product_name = 'Emissions from EIOs'
            ), 0);
          end if;
        end if;

        if (product.product_amount = 0) then
          intensity_range = 0;
        else
          -- Calculate Emission Intensity
          em_intensity = em_product / product.product_amount;


          -- Calculate Incentive Ratio as
          -- IncRatio = min(IncRatioMax, max(IncRatioMin, 1 - (EmIntensity - BM)/(ET - BM))
          intensity_range = 1 - ((em_intensity - benchmark_data.benchmark) / (benchmark_data.eligibility_threshold - benchmark_data.benchmark));
        end if;

        incentive_ratio = least(
          benchmark_data.maximum_incentive_ratio,
          greatest(
            benchmark_data.minimum_incentive_ratio, intensity_range
          )
        );

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
                            incremental_carbon_tax_facility, 0);

        incentive_product_max = coalesce (
                            benchmark_data.incentive_multiplier *
                            payment_allocation_factor *
                            incremental_carbon_tax_facility, 0);

        select into product_return
          row_number() over (),
          product_data.id,
          product_data.product_name,
          product.product_amount,
          em_product,
          incentive_ratio,
          benchmark_data.incentive_multiplier,
          payment_allocation_factor,
          incremental_carbon_tax_facility as incremental_carbon_tax,
          incentive_product,
          incentive_product_max,
          em_intensity,
          benchmark_data.benchmark,
          benchmark_data.eligibility_threshold;

        return next product_return;

      end loop;
    end if;
  end

$function$ language plpgsql stable;

grant execute on function ggircs_portal.application_revision_ciip_incentive to ciip_administrator, ciip_analyst;

comment on function ggircs_portal.application_revision_ciip_incentive is 'Computed column for graphql to get the ciip incentive calculations from application_revision';

commit;
