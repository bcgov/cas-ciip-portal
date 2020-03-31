-- Deploy ggircs-portal:procedure_save_product to pg
-- requires: table_product
-- requires: table_benchmark

begin;

create or replace function ggircs_portal.save_product_mutation_chain(prev_id int, new_name varchar(1000), new_units varchar(1000), new_description varchar(1000),
new_state varchar(1000), new_parent int[], new_requires_emission_allocation boolean, new_add_imported_electricity_emissions boolean, new_subtract_exported_electricity_emissions boolean,
new_add_imported_heat_emissions boolean, new_subtract_exported_heat_emissions boolean)
returns ggircs_portal.product
as $function$
declare
  new_id int;
  result ggircs_portal.product;
begin
  --Insert new value into product table and update current benchmark to point to that product
  insert into ggircs_portal.product(name, description, units, state, parent, requires_emission_allocation, add_imported_electricity_emissions, subtract_exported_electricity_emissions, add_imported_heat_emissions, subtract_exported_heat_emissions)
  values (new_name,
          new_description,
          new_units,
          new_state,
          new_parent,
          new_requires_emission_allocation,
          new_add_imported_electricity_emissions,
          new_subtract_exported_electricity_emissions,
          new_add_imported_heat_emissions,
          new_subtract_exported_heat_emissions) returning id into new_id;

  update ggircs_portal.benchmark
  set product_id = new_id
  where benchmark.product_id = prev_id;

  update ggircs_portal.product
  set state = 'deprecated',
      deleted_at = now(),
      --TODO: Should this be included in the triggers?
      deleted_by = (select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session()))
  where product.id = prev_id;

  select id, name, description, state, requires_emission_allocation from ggircs_portal.product where id = new_id into result;
  return result;
end;
$function$ language plpgsql volatile;

grant execute on function ggircs_portal.save_product_mutation_chain to ciip_administrator;

commit;
