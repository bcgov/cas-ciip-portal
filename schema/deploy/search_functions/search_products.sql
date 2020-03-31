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
            begin
              if search_field is null or search_value is null
                  then return query execute '
                  with outerTable as
                  (
                    select
                      p.*,
                      benchmark,
                      eligibility_threshold,
                      incentive_multiplier,
                      start_reporting_year,
                      end_reporting_year
                    from ggircs_portal.product as p
                    left join ggircs_portal.benchmark as b on p.id = b.product_id
                  )
                  select
                    id, name, description, units,
                    state, parent, requires_emission_allocation, is_ciip_product, add_exported_eletricity_emissions, add_exported_eletricity_emissions, add_exported_heat_emissions, add_exported_heat_emissions,
                    created_at, created_by, updated_at, updated_by, deleted_at, deleted_by
                    from outerTable
                  where
                    state != ''deprecated''
                  and
                    (
                      date_part(''year'', CURRENT_TIMESTAMP) between start_reporting_year and end_reporting_year
                     or benchmark is null)
                  order by ' || order_by_field || ' ' || direction;
              else
              return query execute
              'with outerTable as
              (
                select
                  p.*,
                  benchmark,
                  eligibility_threshold,
                  incentive_multiplier,
                  start_reporting_year,
                  end_reporting_year
                from ggircs_portal.product as p
                left join ggircs_portal.benchmark as b on p.id = b.product_id
              )
              select
                id, name, description, units, state, parent, requires_emission_allocation, is_ciip_product, add_exported_eletricity_emissions, add_exported_eletricity_emissions, add_exported_heat_emissions, add_exported_heat_emissions, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by from outerTable
              where
                state != ''deprecated'' and '|| search_field || '::text ilike ''%' || search_value || '%''
              and
                (
                  date_part(''year'', CURRENT_TIMESTAMP) between start_reporting_year and end_reporting_year
                 or benchmark is null)
              order by '|| order_by_field || ' ' || direction;
              end if;
            end
        $function$ language plpgsql stable;

  grant execute on function ggircs_portal.search_products to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
