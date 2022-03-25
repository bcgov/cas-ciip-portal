-- Revert ggircs-portal:database_functions/change_sold_electricity_units_to_GWh from pg

begin;

alter table ggircs_portal.form_result disable trigger _immutable_form_result;

do
$body$
    declare
      temp_row record;
      element jsonb;
      product_index integer;
      json_data jsonb;
      new_data jsonb;
    begin
    product_index := 0;
    for temp_row in
      select application_id, id as form_result_id, form_result
      from ggircs_portal.form_result
      where form_id=(select id from ggircs_portal.form_json where slug='production')
      and form_result::jsonb@>'[{"productRowId":1}]'::jsonb = true
      loop
        for element in select jsonb_array_elements(form_result) from ggircs_portal.form_result where id=temp_row.form_result_id
          loop
            if (element::jsonb->>'productRowId')::int = 1 then
              new_data := '{"productUnits": "MWh", "productAmount": ' || ((element::jsonb->>'productAmount')::numeric * 1000)::real ||' }';
              json_data := (select jsonb (element) - 'productAmount' - 'productUnits' || new_data::jsonb);
              update ggircs_portal.form_result set form_result[product_index] = json_data where id = temp_row.form_result_id;
            end if;
            product_index := product_index + 1;
          end loop;
          product_index := 0;
      end loop;
    end
  $body$;

alter table ggircs_portal.form_result enable trigger _immutable_form_result;

commit;
