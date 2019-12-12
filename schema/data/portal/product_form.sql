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
        "title" : "Annual Amount"
      },
      "productUnits": {
        "type": "string",
        "title": "Units"
      }
    }
  },
  "uiSchema": {
    "ui:order": [ "reportedProduction", "productUnits" ],
    "productUnits": {
      "ui:disabled": true
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
    "type": "object",
    "title": "Compression Equipment",
    "description":"Please include all compression equipment on site",
    "properties": {
      "calculatedQuantity" : {
        "type": "number",
        "title": "Total Consumed Energy (MWh)"
      },
      "equipment": {
        "type": "array",
        "minItems": 1,
        "items" : {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "title": "Equipment identifier"
            },
            "energySource": {
              "type": "string",
              "title": "Energy Source",
              "enum": ["Electric - Self-Generated", "Electric - From Integrated Grid", "Gas-driven"]
            },
            "powerRating": {
              "type": "number",
              "title": "Power Rating (MW)"
            },
            "loadingFactor": {
              "type": "number",
              "title": "Loading Factor (%)"
            },
            "runtimeHours": {
              "type": "number",
              "title": "Runtime Hours"
            },
            "consumedEnergy": {
              "type":"number",
              "title": "Consumed Energy (MWh)"
            }
          },
          "required": ["id", "energySource", "powerRating", "loadingFactor", "runtimeHours"]
        }
      }
    }
  },
  "uiSchema": {
    "ui:formulae": {
      "calculatedQuantity": {
        "items": "equipment",
        "reduceFunction": "sum",
        "itemFormula": "consumedEnergy"
      }
    },
    "calculatedQuantity": {
      "ui:disabled": true
    },
    "equipment": {
      "ui:add-text": "Add Equipment",
      "ui:remove-text": "Remove Equipment",
      "items" : {
        "ui:order": [
          "id", "energySource", "powerRating", "runtimeHours", "loadingFactor", "consumedEnergy"
        ],
        "id": {
          "ui:help": "ID/name of the unit"
        },
        "loadingFactor": {
          "ui:help": "Actual annual average load fraction for equipment. If load is unavailable, the fraction is determined by the actual annual average seed during operation in revolutions per minute (rpm) divided by the maximum rated speed of equipment in revolutions per minute (rpm)"
        },
        "powerRating": {
          "ui:help": "Equipment''s maximum rated power, expressed in megawatts"
        },
        "runtimeHours": {
          "ui:help": "Annual total hours the equipment was operating"
        },
        "ui:formulae" : {
          "consumedEnergy": "powerRating * loadingFactor/100 * runtimeHours"
        },
        "consumedEnergy": {
          "ui:disabled": true
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
