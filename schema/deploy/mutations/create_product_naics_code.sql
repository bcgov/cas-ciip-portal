-- Deploy ggircs-portal:mutations/create_product_naics_code to pg
-- requires: tables/product_naics_code

begin;

create or replace function ggircs_portal.create_product_naics_code(
  product_id_input int,
  naics_code_id_input int,
  is_mandatory_input boolean
) returns ggircs_portal.product_naics_code
as $function$

declare
  new_id int;
  result ggircs_portal.product_naics_code;
begin

  -- Reset deleted at/by and update description on conflict
  insert into ggircs_portal.product_naics_code(product_id, naics_code_id, is_mandatory)
  values (product_id_input, naics_code_id_input, is_mandatory_input)
  on conflict(product_id, naics_code_id) do update set is_mandatory=is_mandatory_input, deleted_at=null, deleted_by=null
  returning id into new_id;

  select * from ggircs_portal.product_naics_code where id=new_id into result;
  return result;

end;

$function$ language plpgsql volatile;

grant execute on function ggircs_portal.create_product_naics_code to ciip_administrator;
comment on function ggircs_portal.create_product_naics_code is 'This custom create mutation does an upsert on conflict of the product_id & naics_code_id columns, updating the is_mandatory column & setting the deleted at/by columns to null';

commit;
