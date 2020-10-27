-- Deploy test_helpers:create_products to pg
-- requires: schema_test_helper

begin;

  create or replace function test_helper.create_product(
        id int default 0,
        product_name text default 'Test Product',
        units text default 'angstrom per squared fhqwhgads',
        product_state ggircs_portal.ciip_product_state default 'draft', -- needs to be any of draft, published, archived to match the enum defined in ggircs_portal.ciip_product_state
        is_ciip_product boolean default true,
        requires_emission_allocation boolean default true,
        requires_product_amount boolean default true,
        subtract_exported_electricity_emissions boolean default true,
        add_purchased_electricity_emissions boolean default true,
        subtract_exported_heat_emissions boolean default true,
        add_purchased_heat_emissions boolean default true,
        subtract_generated_electricity_emissions boolean default true,
        subtract_generated_heat_emissions boolean default true,
        add_emissions_from_eios boolean default true,
        is_read_only boolean default true,
        updated_at timestamp default '2018-01-01'
      )
  returns void as
  $function$
    begin
      if($1 > 0) then -- ID has been set
        insert into ggircs_portal.product(
          id,
          product_name,
          units,
          product_state,
          is_ciip_product,
          requires_emission_allocation,
          requires_product_amount,
          subtract_exported_electricity_emissions,
          add_purchased_electricity_emissions,
          subtract_exported_heat_emissions,
          add_purchased_heat_emissions,
          subtract_generated_electricity_emissions,
          subtract_generated_heat_emissions,
          add_emissions_from_eios,
          is_read_only,
          updated_at
        )
        overriding system value
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
      else -- No ID has been provided (or requested to be zero) so we let the DB handle it
        insert into ggircs_portal.product(
          product_name,
          units,
          product_state,
          is_ciip_product,
          requires_emission_allocation,
          requires_product_amount,
          subtract_exported_electricity_emissions,
          add_purchased_electricity_emissions,
          subtract_exported_heat_emissions,
          add_purchased_heat_emissions,
          subtract_generated_electricity_emissions,
          subtract_generated_heat_emissions,
          add_emissions_from_eios,
          is_read_only,
          updated_at
        )
        overriding system value
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
      end if;

    end;
  $function$ language plpgsql volatile;

commit;
