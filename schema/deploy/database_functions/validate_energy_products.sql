-- Deploy ggircs-portal:database_functions/validate_energy_products to pg
-- requires: views/ciip_production

begin;

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
  end;

commit;
