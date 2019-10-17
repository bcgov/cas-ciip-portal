-- Deploy ggircs-portal:procedure_save_product to pg
-- requires: table_product
-- requires: table_benchmark

begin;

create or replace function ggircs_portal.save_product_mutation_chain(prev_id int, new_name varchar(1000), new_description varchar(1000),
new_state varchar(1000), new_parent int ARRAY, benchmark_id int = null)
returns ggircs_portal.product
as $function$
declare
  new_id int;
  result ggircs_portal.product;
begin

  --Insert new value into product table and update current benchmark to point to that product
  insert into ggircs_portal.product(name, description, state, parent)
  values (new_name, new_description, new_state, new_parent) returning id into new_id;

  if benchmark_id is not null then
  update ggircs_portal.benchmark 
  set product_id = new_id
  where benchmark.id = benchmark_id;
  end if;

  update ggircs_portal.product
  set state = 'deprecated',
      deleted_at = now(),
      deleted_by = 'Admin' --TODO: Should this be included in the triggers?
  where product.id = prev_id;

  select id, name, description from ggircs_portal.product where id = new_id into result;
  return result;
end;
$function$ language plpgsql strict volatile;

commit;
