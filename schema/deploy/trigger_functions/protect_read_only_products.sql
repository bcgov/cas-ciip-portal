-- Deploy ggircs-portal:trigger_functions/protect_read_only_products to pg
-- requires: schema_ggircs_portal_private

begin;

create or replace function ggircs_portal_private.protect_read_only_products()
  returns trigger as $$
    begin
      if (new.product_state != 'draft'
          and old.id != new.id
          and old.product_name != new.product_name
          and old.product_description != new.product_description
          and old.units != new.units
          and old.requires_emission_allocation != new.requires_emission_allocation
          and old.is_ciip_product != new.is_ciip_product
          and old.requires_emission_allocation != new.requires_emission_allocation
          and old.add_purchased_electricity_emissions != new.add_purchased_electricity_emissions
          and old.subtract_exported_electricity_emissions != new.subtract_exported_electricity_emissions
          and old.add_purchased_heat_emissions != new.add_purchased_heat_emissions
          and old.subtract_exported_heat_emissions != new.subtract_exported_heat_emissions
          and old.subtract_generated_electricity_emissions != new.subtract_generated_electricity_emissions
          and old.subtract_generated_heat_emissions != subtract_generated_heat_emissions
          and old.add_emissions_from_eios != new.add_emissions_from_eios) then
          raise exception 'Product row is read only. Only the product_state column of a product not in the draft state can be edited';
      end if;
      return new;
    end;
  $$ language plpgsql;

grant execute on function ggircs_portal_private.protect_read_only_products to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.protect_read_only_products is 'a trigger function that throws an exception if a read only product row is being edited';

commit;
