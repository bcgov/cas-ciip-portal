-- Deploy ggircs-portal:trigger_functions/protect_read_only_products to pg
-- requires: schema_ggircs_portal_private

begin;

create or replace function ggircs_portal_private.protect_read_only_products()
  returns trigger as $$
    begin
      if (old.product_state = 'archived') then
        raise exception 'Product row is read only. Archived products cannot be edited';
      elsif (new.product_state != 'draft' and
          (old.id != new.id
          or old.product_name != new.product_name
          or old.units != new.units
          or old.requires_emission_allocation != new.requires_emission_allocation
          or old.is_ciip_product != new.is_ciip_product
          or old.requires_emission_allocation != new.requires_emission_allocation
          or old.add_purchased_electricity_emissions != new.add_purchased_electricity_emissions
          or old.subtract_exported_electricity_emissions != new.subtract_exported_electricity_emissions
          or old.add_purchased_heat_emissions != new.add_purchased_heat_emissions
          or old.subtract_exported_heat_emissions != new.subtract_exported_heat_emissions
          or old.subtract_generated_electricity_emissions != new.subtract_generated_electricity_emissions
          or old.subtract_generated_heat_emissions != new.subtract_generated_heat_emissions
          or old.add_emissions_from_eios != new.add_emissions_from_eios))
          then
            raise exception 'Product row is read only. A published product can only change its state to archived';
      elsif (old.product_state = 'published' and new.product_state != 'archived') then
        raise exception 'A published product cannot change back to draft state, can only change to archived state';
      end if;
      return new;
    end;
  $$ language plpgsql;

grant execute on function ggircs_portal_private.protect_read_only_products to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.protect_read_only_products is 'a trigger function that throws an exception if a read only product row is being edited';

commit;
