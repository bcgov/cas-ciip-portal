begin;

with rows as (
insert into ggircs_portal.product_form(id, product_form_description, product_form_schema, production_calculation_formula)
overriding system value
values
(1, 'Product form for Wood/Pulp and paper products', '{
 "schema": {
    "type": "object",
    "properties" : {
      "reportedProduction": {
        "type": "number",
        "title" : "Annual Production Amount"
      }
    }
  }
}','((facility non-biogenic emissions + energy import/export balance emissions)* product allocation factor)/ directly reported production'),
(2, 'Product form for gas plants', '{
 "schema": {
    "type": "object",
    "properties" : {
      "reportedProduction": {
        "type": "number",
        "title" : "Annual Production Amount Reported in Petrinex"
      },
      "ethylenePlantIncluded": {
        "type": "boolean"
      },
      "sulphurPlantIncluded": {
        "type": "boolean"
      },
      "gasComposition" : {
        "type": "string"
      }
    }
  }
}','Directly reported from Petrinex (input) + ethylene plant or sulhpur plant included + gas composition'),
(3, 'Product form for Compression', '{
 "schema": {
    "type": "array",
    "items" : {
      "type": "object",
      "properties": {
        "powerRating": {
          "type": "number",
          "title": "Power Rating"
        },
        "loadingFactor": {
          "type": "number",
          "title": "Loading Factor"
        },
        "runtimeHours": {
          "type": "number",
          "title": "Runtime Hours"
        }
      }
    }
  }
}',''),
(4, 'Product form for Petroleum Refining', '{
 "schema": {
    "type": "object",
    "properties" : {
      "reportedProduction": {
        "type": "number",
        "title" : "Annual Production Amount"
      }
    }
  }
}','')
on conflict(id) do update
set
product_form_description=excluded.product_form_description,
product_form_schema=excluded.product_form_schema,
production_calculation_formula=excluded.production_calculation_formula
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product_form' from rows;

select setval from
setval('ggircs_portal.product_form_id_seq', (select max(id) from ggircs_portal.product_form), true)
where setval = 0;

commit;
