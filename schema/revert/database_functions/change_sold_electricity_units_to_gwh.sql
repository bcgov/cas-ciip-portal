-- Revert ggircs-portal:database_functions/change_sold_electricity_units_to_GWh from pg

begin;

alter table ggircs_portal.form_result disable trigger _immutable_form_result;

do
$body$
    declare
      temp_row record;
      element jsonb;
      json_data jsonb;
      new_data jsonb;
      product_array jsonb[];
    begin
    for temp_row in
      select application_id, id as form_result_id, form_result
      from ggircs_portal.form_result
      where form_id=(select id from ggircs_portal.form_json where slug='production')
      and form_result::jsonb@>'[{"productRowId":1}]'::jsonb = true
      loop
        for element in select jsonb_array_elements(form_result) from ggircs_portal.form_result where id=temp_row.form_result_id
          loop
            json_data := element;
            if (element::jsonb->>'productRowId')::int = 1 and (element::jsonb->>'productUnits') = 'GWh' then
              new_data := jsonb_build_object('productUnits', 'MWh', 'productAmount', ((element::jsonb->>'productAmount')::numeric * 1000)::real );
              json_data := (select jsonb (element) - 'productAmount' - 'productUnits' || new_data::jsonb);
            end if;
            product_array = array_append(product_array, json_data);
          end loop;
          update ggircs_portal.form_result set form_result = array_to_json(product_array)::jsonb where id = temp_row.form_result_id;
          product_array := null;
      end loop;
    end
  $body$;

alter table ggircs_portal.form_result enable trigger _immutable_form_result;

drop function ggircs_portal_private.change_sold_electricity_units_to_gwh;

commit;
