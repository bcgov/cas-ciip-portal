-- Deploy ggircs-portal:database_functions/change_sold_electricity_units_to_GWh to pg
-- requires: tables/form_result

/**
  This migration was made as a result of a request from CAS to change the units of Sold Electricity from MWh to GWh.
  This requires a change to live data in the form_result table.
  Each form_result record that reported Sold Electricity in MWh needs to be updated to reflect the new units.
  The units are changed to GWh and the amount is divided by 1000 to convert to GWh.
  Production form_result records are an array of json objects, each object representing a product.
  This migration iterates over each of these objects, edits the object's JSON if it is a Sold Electricity product and then
  updates the JSON object with the new data at the index of the form_result array record where it was found.
**/

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
    -- Loop over all production form_result records that report Sold Electricity (productRowId=1).
    for temp_row in
      select application_id, id as form_result_id, form_result
      from ggircs_portal.form_result
      where form_id=(select id from ggircs_portal.form_json where slug='production')
      and form_result::jsonb@>'[{"productRowId":1}]'::jsonb = true
      -- Loop over each element of the form_result JSON array and edit the productUnits & productAmount if the element is the Sold Electricity product.
      loop
        for element in select jsonb_array_elements(form_result) from ggircs_portal.form_result where id=temp_row.form_result_id
          loop
            if (element::jsonb->>'productRowId')::int = 1 then
              -- Change productUnits to 'GWh' and scale by productAmount by a factor of 1000 to compensate.
              new_data := '{"productUnits": "GWh", "productAmount": ' || ((element::jsonb->>'productAmount')::numeric / 1000)::real ||' }';
              json_data := (select jsonb (element) - 'productAmount' - 'productUnits' || new_data::jsonb);
              -- Update the corresponding element in the form_result JSON array.
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
