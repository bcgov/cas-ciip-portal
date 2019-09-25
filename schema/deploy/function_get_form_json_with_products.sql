-- Deploy ggircs-portal:function_get_form_json_with_products to pg
-- requires: table_form_json
-- requires: table_product

BEGIN;
create type form_json_product_type as (kl_products text[], m3_products text[], t_products text[], null_products text[], form_id int, form_name text, form_json jsonb);
create or replace function ggircs_portal.get_form_json_with_products(form_id_input numeric)
  returns setof form_json_product_type
  as $function$
    declare result form_json_product_type;
    begin
    select array(select name from ggircs_portal.product where units = 'kl') as kl_products into result.kl_products;
    select array(select name from ggircs_portal.product where units = 'm3') as m3_products into result.m3_products;
    select array(select name from ggircs_portal.product where units = 't') as t_products into result.t_products;
    select array(select name from ggircs_portal.product where units is null) as null_products into result.null_products;
    
    select form_json.id, form_json.name, form_json.form_json 
      into result.form_id, result.form_name, result.form_json
      from ggircs_portal.form_json
      where id = form_id_input;

    return next result;
    return;
    end;
  $function$
  language plpgsql stable;

COMMIT;
