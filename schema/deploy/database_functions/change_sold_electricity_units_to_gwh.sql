-- Deploy ggircs-portal:database_functions/change_sold_electricity_units_to_GWh to pg
-- requires: tables/form_result

/**
  This migration was made as a result of a request from CAS to change the units of Sold Electricity from MWh to GWh.
  This requires a change to live data in the form_result table.
  Each form_result record that reported Sold Electricity in MWh needs to be updated to reflect the new units.
  The units are changed to GWh and the amount is divided by 1000 to convert to GWh.
  Production form_result records are an array of json objects, each object representing a product.
  This migration iterates over each of these objects and edits the object's JSON if it is a Sold Electricity product.
  Each object is appended to jsonb array, which is then used to update the form_result record.
**/

begin;

create or replace function ggircs_portal_private.change_sold_electricity_units_to_gwh()
  returns void as
  $body$
      declare
        temp_row record;
        element jsonb;
        json_data jsonb;
        new_data jsonb;
        product_array jsonb[];
      begin
      -- Disable immutable form result trigger
      alter table ggircs_portal.form_result disable trigger _immutable_form_result;
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
              -- Grab the JSON data for the current element.
              json_data := element;
              if (element::jsonb->>'productRowId')::int = 1 and (element::jsonb->>'productUnits') = 'MWh' then
                -- Edit the JSON data to change the productUnits to GWh and scale the productAmount by a factor of 1000.
                new_data := jsonb_build_object('productUnits', 'GWh', 'productAmount', ((element::jsonb->>'productAmount')::numeric / 1000)::real );
                json_data := (select jsonb (element) - 'productAmount' - 'productUnits' || new_data::jsonb);
              end if;
              -- Append the JSON data to the product_array to recreate the array of products.
              product_array = array_append(product_array, json_data);
            end loop;
            -- Update the form_result record with the edited JSON data.
            update ggircs_portal.form_result set form_result = array_to_json(product_array)::jsonb where id = temp_row.form_result_id;
            -- Reset the product_array for the next iteration.
            product_array := null;
        end loop;
        alter table ggircs_portal.form_result enable trigger _immutable_form_result;
      end
    $body$
    language 'plpgsql' volatile;

select ggircs_portal_private.change_sold_electricity_units_to_gwh();

commit;
