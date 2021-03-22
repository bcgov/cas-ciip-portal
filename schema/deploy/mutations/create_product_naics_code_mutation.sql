-- Deploy ggircs-portal:mutations/create_product_naics_code_mutation to pg
-- requires: tables/product_naics_code

begin;

create or replace function ggircs_portal.create_product_naics_code_mutation(
  product_id_input int,
  naics_code_id_input int,
  is_mandatory_input boolean
) returns void as $function$

  -- Reset deleted at/by and update description on conflict
  insert into ggircs_portal.product_naics_code(product_id, naics_code_id, is_mandatory)
  values (product_id_input, naics_code_id_input, is_mandatory_input)
  on conflict(product_id, naics_code_id) do update set is_mandatory=is_mandatory_input, deleted_at=null, deleted_by=null;

$function$ language sql volatile;

grant execute on function ggircs_portal.create_product_naics_code_mutation to ciip_administrator;
comment on function ggircs_portal.create_product_naics_code_mutation is 'This custom create mutation does an upsert on conflict of the product_id & naics_code_id columns, updating the is_mandatory column & setting the deleted at/by columns to null';

commit;
