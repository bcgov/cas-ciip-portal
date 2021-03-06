-- Deploy ggircs-portal:view_ciip_production to pg
-- requires: table_form_result

/**
  This view cannot be cleanly walked back to its original state in this revert file as 'create or replace view' cannot drop columns.
  From the postgres docs:
    {The new query must generate the same columns that were generated by the existing view query,
    (that is, the same column names in the same order and with the same data types), but it may add additional columns to
    the end of the list. The calculations giving rise to the output columns may be completely different.}
  This view can also not be dropped without dropping the validate_products function since that view depends on this one.
  In order to walk the migration backwards properly, this view is dropped & cascaded to the validate_products function, and then
  both of these views are recreated as they were in the original sqitch deploy files.
**/

begin;
  drop view ggircs_portal.ciip_production cascade;
  create or replace view ggircs_portal.ciip_production as (
    with x as (
      select
         application_id, version_number,
         json_array_elements((form_result)::json) as production_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'production'
    )
    select
       x.application_id,
       x.version_number,
       (x.production_data ->> 'productAmount')::numeric as product_amount,
       (x.production_data ->> 'productRowId')::integer as product_id,
       (x.production_data ->> 'productUnits')::varchar(1000) as product_units,
       (x.production_data ->> 'productEmissions')::numeric as product_emissions,
       (x.production_data ->> 'requiresEmissionAllocation')::boolean as requires_emission_allocation,
       (x.production_data ->> 'isEnergyProduct')::boolean as is_energy_product
    from x
 );

grant select on table ggircs_portal.ciip_production to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_production is E'@omit\n The view for production data reported in the application';
comment on column ggircs_portal.ciip_production.application_id is 'The application id';
comment on column ggircs_portal.ciip_production.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_production.product_amount is 'The yearly amount for the product';
comment on column ggircs_portal.ciip_production.product_id is 'The id of the product';
comment on column ggircs_portal.ciip_production.product_units is 'The units for the product';
comment on column ggircs_portal.ciip_production.product_emissions is 'The amount of emissions, in tCO2e, allocated to the product';
comment on column ggircs_portal.ciip_production.requires_emission_allocation is 'Whether or not the product requires reporting an emission allocation';
comment on column ggircs_portal.ciip_production.is_energy_product is 'Boolean value indicates if the product is an energy product that is reported alongside other products';

create or replace function ggircs_portal_private.validate_energy_products(
    product_array ggircs_portal.ciip_production[]
  )
    returns void
    as
    $function$
    declare
      product record;
      product_data ggircs_portal.product;
      product_ids int[];
      i int;
    begin
      i=1;
      foreach product in array product_array
        loop
          product_ids[i] = product.product_id;
          i = i + 1;
        end loop;

      foreach product in array product_array
        loop

          select * into product_data from ggircs_portal.product
          where id = product.product_id;

          case
            when (product_data.add_purchased_electricity_emissions and (select not 3 = any (product_ids))) then
              raise exception 'Reported product requires purchased_electricity to be reported, but purchased_electricity is missing';
            when (product_data.subtract_exported_electricity_emissions and (select not 1 = any (product_ids))) then
              raise exception 'Reported product requires exported_electricity to be reported, but exported_electricity is missing';
            when (product_data.add_purchased_heat_emissions and (select not 4 = any (product_ids))) then
              raise exception 'Reported product requires purchased_heat to be reported, but purchased_heat is missing';
            when (product_data.subtract_exported_heat_emissions and (select not 2 = any (product_ids))) then
              raise exception 'Reported product requires exported_heat to be reported, but exported_heat is missing';
            when (product_data.subtract_generated_electricity_emissions and (select not 5 = any (product_ids))) then
              raise exception 'Reported product requires generated_electricity to be reported, but generated_electricity is missing';
            when (product_data.subtract_generated_heat_emissions and (select not 6 = any (product_ids))) then
              raise exception 'Reported product requires generated_heat to be reported, but generated_heat is missing';
            when (product_data.add_emissions_from_eios and (select not 7 = any (product_ids))) then
              raise exception 'Reported product requires emissions_from_eios to be reported, but emissions_from_eios is missing';
            else
              return;
          end case;

        end loop;
      return;
    end;

    $function$ language 'plpgsql' stable;

commit;
