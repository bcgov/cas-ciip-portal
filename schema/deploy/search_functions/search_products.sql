-- Deploy ggircs-portal:function_search_products to pg
-- requires: table_product

begin;

create or replace function ggircs_portal.search_products(
  search_field text,
  search_value text,
  order_by_field text default 'id',
  direction text default 'asc'
)

returns setof ggircs_portal.product as
  $function$
    declare
      search_query_input_query text;
    begin

      search_query_input_query :='with outerTable as
          (
            select
              p.*,
              benchmark,
              eligibility_threshold,
              incentive_multiplier,
              start_reporting_year,
              end_reporting_year,
              b.created_at as benchmark_created_at
            from ggircs_portal.product as p
            left join ggircs_portal.benchmark as b
              on p.id = b.product_id
          ),
          innerTable as
          (
            select distinct on (id) * from outerTable order by id, benchmark_created_at desc
          )';

      if search_field is null or search_value is null
          then return query execute search_query_input_query ||
            'select
              id, product_name, units,
              product_state, requires_emission_allocation, is_ciip_product, requires_product_amount, subtract_exported_electricity_emissions, subtract_exported_electricity_emissions, subtract_exported_heat_emissions, subtract_exported_heat_emissions,
              subtract_generated_electricity_emissions, subtract_generated_heat_emissions, add_emissions_from_eios, is_read_only, is_energy_product, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by
              from innerTable order by ' || order_by_field || ' ' || direction;
      else
        return query execute search_query_input_query ||
          'select
            id, product_name, units, product_state,
            requires_emission_allocation, is_ciip_product, requires_product_amount, subtract_exported_electricity_emissions, subtract_exported_electricity_emissions, subtract_exported_heat_emissions, subtract_exported_heat_emissions,
            subtract_generated_electricity_emissions, subtract_generated_heat_emissions, add_emissions_from_eios, is_read_only, is_energy_product, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by
            from innerTable
          where
            '|| search_field || '::text ilike ''%' || search_value || '%''
          order by '|| order_by_field || ' ' || direction;

      end if;
    end
  $function$ language plpgsql stable;

  grant execute on function ggircs_portal.search_products to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
