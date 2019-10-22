-- Deploy ggircs-portal:table_form_json to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.form_json (
  id serial not null,
  name varchar(1000) not null,
  form_json jsonb not null,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000)
  --todo: add versioning columns
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.form_json
  for each row
  execute procedure ggircs_portal.update_timestamps();

create unique index form_json_id_uindex
  on ggircs_portal.form_json (id);

alter table ggircs_portal.form_json
  add constraint form_json_pk
    primary key (id);

comment on column ggircs_portal.form_json.id is 'Unique ID for the form';
comment on column ggircs_portal.form_json.name is 'Name for the form';
comment on column ggircs_portal.form_json.form_json is 'The JSON object that creates the form';
comment on column ggircs_portal.form_json.created_at is 'The date the form was updated';
comment on column ggircs_portal.form_json.created_by is 'The person who updated the form';
comment on column ggircs_portal.form_json.updated_at is 'The date the form was updated';
comment on column ggircs_portal.form_json.updated_by is 'The person who updated the form';


insert into ggircs_portal.form_json
  (
    id, name, form_json
  )
  values (
    1,
    'Admin',
   '{
  "title": "Administrative Information",
  "showCompletedPage": false,
  "pages": [
    {
      "name": "Administrative Information",
      "elements": [
        {
          "type": "paneldynamic",
          "name": "reportingOperationInformation",
          "useDisplayValuesInTitle": false,
          "title": "Reporting Operation Information",
          "templateElements": [
            {
              "type": "text",
              "name": "operatorName",
              "title": "Legal Name of Operator:",
              "isRequired": true,
              "size": 340
            },
            {
              "type": "text",
              "name": "operatorTradeName",
              "title": "Operator''s Trade Name"
            },
            {
              "type": "text",
              "name": "duns",
              "title": "DUNS Number",
              "isRequired": true,
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "bcCorporateRegistryNumber",
              "title": "BC Corporate Registry Number ",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "naicsCode",
              "startWithNewLine": false,
              "title": "NAICS Code",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "mailingAddress",
              "title": "Operator Mailing Address"
            },
            {
              "type": "text",
              "name": "mailingAddressCity",
              "startWithNewLine": false,
              "title": "Mailing Address City"
            },
            {
              "type": "dropdown",
              "name": "mailingAddressProvince",
              "title": "Province",
              "choices": [
                "Alberta",
                "British Columbia",
                "Manitoba",
                "New Brunswick",
                "Newfoundland and Labrador",
                "Northwest Territories",
                "Nova Scotia",
                "Nunavut",
                "Ontario",
                "Prince Edward Island",
                "Quebec",
                "Saskatchewan",
                "Yukon"
              ]
            },
            {
              "type": "text",
              "name": "mailingAddressPostalCode",
              "startWithNewLine": false,
              "title": "Mailing Address Postal Code",
              "validators": [
                {
                  "type": "regex",
                  "text": "The postal code should match this pattern: A1A1A1",
                  "regex": "^([a-zA-Z]\\d){3}$"
                }
              ]
            },
            {
              "type": "text",
              "name": "mailingAddressCountry",
              "width": "50%",
              "title": "Mailing Address Country"
            }
          ],
          "allowAddPanel": false,
          "allowRemovePanel": false,
          "panelCount": 1,
          "minPanelCount": 1,
          "keyName": "name",
          "panelAddText": "Add another  item",
          "panelRemoveText": "Remove item"
        },
        {
          "type": "paneldynamic",
          "name": "operationalRepresentativeInformation",
          "title": "Operational Representative",
          "templateElements": [
            {
              "type": "text",
              "name": "firstName",
              "startWithNewLine": false,
              "title": "First Name",
              "isRequired": true,
              "size": 340
            },
            {
              "type": "text",
              "name": "lastName",
              "startWithNewLine": false,
              "title": "Last Name",
              "isRequired": true,
              "size": 340
            },
            {
              "type": "text",
              "name": "position",
              "startWithNewLine": false,
              "title": "Position/Title"
            },
            {
              "type": "text",
              "name": "emailAddress",
              "title": "Email Address",
              "isRequired": true,
              "inputType": "email"
            },
            {
              "type": "text",
              "name": "phone",
              "startWithNewLine": false,
              "title": "Telephone Number",
              "inputType": "tel"
            },
            {
              "type": "text",
              "name": "fax",
              "startWithNewLine": false,
              "title": "Fax Number",
              "inputType": "tel"
            },
            {
              "type": "text",
              "name": "mailingAddress",
              "title": "Operator Mailing Address"
            },
            {
              "type": "text",
              "name": "mailingAddressCity",
              "startWithNewLine": false,
              "title": "Mailing Address City"
            },
            {
              "type": "dropdown",
              "name": "mailingAddressProvince",
              "startWithNewLine": false,
              "title": "Province",
              "choices": [
                "Alberta",
                "British Columbia",
                "Manitoba",
                "New Brunswick",
                "Newfoundland and Labrador",
                "Northwest Territories",
                "Nova Scotia",
                "Nunavut",
                "Ontario",
                "Prince Edward Island",
                "Quebec",
                "Saskatchewan",
                "Yukon"
              ]
            },
            {
              "type": "text",
              "name": "mailingAddressPostalCode",
              "width": "32.5%",
              "title": "Mailing Address Postal Code",
              "validators": [
                {
                  "type": "regex",
                  "text": "The postal code should match this pattern: A1A1A1",
                  "regex": "^([a-zA-Z]\\d){3}$"
                }
              ]
            }
          ],
          "allowAddPanel": false,
          "allowRemovePanel": false,
          "panelCount": 1,
          "minPanelCount": 1,
          "keyName": "name",
          "panelAddText": "Add another  item",
          "panelRemoveText": "Remove item"
        },
        {
          "type": "paneldynamic",
          "name": "facilityInformation",
          "title": "Facility Information",
          "templateElements": [
            {
              "type": "text",
              "name": "facilityName",
              "title": "Facility Name",
              "isRequired": true,
              "size": 340
            },
            {
              "type": "dropdown",
              "name": "facilityType",
              "title": "Facility Type",
              "choices": [
                "IF_a",
                "IF_b",
                "L_c",
                "SFO",
                "LFO",
                "EIO"
              ]
            },
            {
              "type": "text",
              "name": "bcghgid",
              "startWithNewLine": false,
              "title": "BCGHG ID Number",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "naicsCode",
              "startWithNewLine": false,
              "title": "NAICS Code",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "latitude",
              "title": "Latitude",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "longitude",
              "startWithNewLine": false,
              "title": "Longitude",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "nearestCity",
              "title": "Nearest City"
            },
            {
              "type": "text",
              "name": "mailingAddress",
              "title": "Mailing Address"
            },
            {
              "type": "text",
              "name": "mailingAddressCity",
              "startWithNewLine": false,
              "title": "Mailing Address City"
            },
            {
              "type": "dropdown",
              "name": "mailingAddressProvince",
              "title": "Province",
              "choices": [
                "Alberta",
                "British Columbia",
                "Manitoba",
                "New Brunswick",
                "Newfoundland and Labrador",
                "Northwest Territories",
                "Nova Scotia",
                "Nunavut",
                "Ontario",
                "Prince Edward Island",
                "Quebec",
                "Saskatchewan",
                "Yukon"
              ]
            },
            {
              "type": "text",
              "name": "mailingAddressPostalCode",
              "startWithNewLine": false,
              "title": "Mailing Address Postal Code",
              "validators": [
                {
                  "type": "regex",
                  "text": "The postal code should match this pattern: A1A1A1",
                  "regex": "^([a-zA-Z]\\d){3}$"
                }
              ]
            },
            {
              "type": "comment",
              "name": "facilityDescription",
              "title": "Facility Description"
            }
          ],
          "allowAddPanel": false,
          "allowRemovePanel": false,
          "panelCount": 1,
          "minPanelCount": 1,
          "keyName": "name",
          "panelAddText": "Add another item",
          "panelRemoveText": "Remove item"
        }
      ]
    }
  ],
  "showQuestionNumbers": "off"
}'::jsonb
), (
    2,
    'Emission',
   '{
  "title": "Emissions",
  "showCompletedPage": false,
  "pages": [
    {
      "name": "Emissions",
      "elements": [
        {
          "type": "paneldynamic",
          "name": "GeneralStationaryCombustion",
          "title": "Stationary Fuel Combustion Emissions ",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "CO2nonbio",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from non-biomass (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bionC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass not listed in Schedule C of GGERR (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bioC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass listed in Schedule C of GGERR  (bioCO2) ",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CH4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 25 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 25",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Methane (CH4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "N2O",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 298 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 298",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Nitrous oxide (N2O)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            }
          ],
          "panelCount": 1,
          "allowAddPanel": false,
          "allowRemovePanel": false
        },
        {
          "type": "paneldynamic",
          "name": "Venting",
          "title": "Venting Emissions",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "CO2nonbio",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from non-biomass (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bionC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass not listed in Schedule C of GGERR (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bioC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass listed in Schedule C of GGERR  (bioCO2) ",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CH4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 25 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 25",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Methane (CH4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "N2O",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 298 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 298",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Nitrous oxide (N2O)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            }
          ],
          "panelCount": 1,
          "allowAddPanel": false,
          "allowRemovePanel": false
        },
        {
          "type": "paneldynamic",
          "name": "Flaring",
          "title": "Flaring Emissions",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "CO2nonbio",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from non-biomass (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bionC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass not listed in Schedule C of GGERR (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bioC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass listed in Schedule C of GGERR  (bioCO2) ",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CH4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 25 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 25",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Methane (CH4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "N2O",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 298 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 298",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Nitrous oxide (N2O)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            }
          ],
          "panelCount": 1,
          "allowAddPanel": false,
          "allowRemovePanel": false
        },
        {
          "type": "paneldynamic",
          "name": "Fugitive",
          "title": "Fugitive/Other Emissions",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "CO2nonbio",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from non-biomass (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bionC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass not listed in Schedule C of GGERR (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bioC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass listed in Schedule C of GGERR  (bioCO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CH4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 25 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 25",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Methane (CH4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "N2O",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 298 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 298",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Nitrous oxide (N2O)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "SF6",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 22800 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 22800",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Sulfur Hexafluoride (SF6)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "Perfluoromethane_CF4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 7390 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 7390",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Perfluoromethane (CF4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "Perfluoroethane_C2F6",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 12200 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 12200",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Perfluoroethane (C2F6)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            }
          ],
          "panelCount": 1,
          "allowAddPanel": false,
          "allowRemovePanel": false
        },
        {
          "type": "paneldynamic",
          "name": "OnSiteTransportation",
          "title": "On-Site Transportation Emissions",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "CO2nonbio",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from non-biomass (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bionC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass not listed in Schedule C of GGERR (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bioC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass listed in Schedule C of GGERR  (bioCO2) ",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CH4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 25 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 25",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Methane (CH4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "N2O",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 298 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 298",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Nitrous oxide (N2O)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            }
          ],
          "panelCount": 1,
          "allowAddPanel": false,
          "allowRemovePanel": false
        },
        {
          "type": "paneldynamic",
          "name": "Waste",
          "title": "Waste Emissions",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "CO2nonbio",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from non-biomass (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bionC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass not listed in Schedule C of GGERR (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bioC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass listed in Schedule C of GGERR  (bioCO2) ",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CH4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 25 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 25",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Methane (CH4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "N2O",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 298 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 298",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Nitrous oxide (N2O)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            }
          ],
          "panelCount": 1,
          "allowAddPanel": false,
          "allowRemovePanel": false
        },
        {
          "type": "paneldynamic",
          "name": "Wastewater",
          "title": "Wastewater Emissions",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "CO2nonbio",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from non-biomass (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bionC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass not listed in Schedule C of GGERR (CO2)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CO2bioC",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 1 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 1",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Carbon dioxide from biomass listed in Schedule C of GGERR  (bioCO2) ",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "CH4",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 25 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 25",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Methane (CH4)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            },
            {
              "type": "paneldynamic",
              "name": "N2O",
              "templateElements": [
                {
                  "type": "text",
                  "name": "annualEmission",
                  "startWithNewLine": false,
                  "title": "Tonnes",
                  "inputType": "number"
                },
                {
                  "type": "expression",
                  "name": "GWP",
                  "startWithNewLine": false,
                  "expression": "\" x 298 = \"",
                  "commentText": "Other (describe)"
                },
                {
                  "type": "expression",
                  "name": "annualCO2e",
                  "startWithNewLine": false,
                  "title": "Tonnes (in CO2 Equivalent)",
                  "expression": "{panel.annualEmission} * 298",
                  "commentText": "Other (describe)"
                }
              ],
              "title": "Nitrous oxide (N2O)",
              "panelCount": 1,
              "allowAddPanel": false,
              "allowRemovePanel": false
            }
          ],
          "panelCount": 1,
          "allowAddPanel": false,
          "allowRemovePanel": false
        }
      ],
      "title": "Emissions"
    }
  ],
  "showQuestionNumbers": "off"
}'::jsonb
), (
    3,
    'Fuel',
   '{
  "title": "Fuel Usage",
  "showCompletedPage": false,
  "pages": [
    {
      "name": "Fuel Usage",
      "elements": [
        {
          "type": "paneldynamic",
          "name": "fuels",
          "title": "Fuels",
          "templateElements": [
            {
              "type": "dropdown",
              "name": "fuelType",
              "title": "Fuel Type",
              "choices": [
                "flared natural gas",
                "diesel",
                "combusted natural gas",
                "propane"
              ]
            },
            {
              "type": "text",
              "name": "description",
              "startWithNewLine": false,
              "title": "Description"
            },
            {
              "type": "text",
              "name": "quantity",
              "title": "Quantity",
              "inputType": "number"
            },
            {
              "type": "dropdown",
              "name": "fuelUnits",
              "startWithNewLine": false,
              "title": "Units",
              "choices": [
                {
                  "value": "m3",
                  "text": "meters cube"
                },
                {
                  "value": "kl",
                  "text": "kiloliters"
                }
              ]
            },
            {
              "type": "dropdown",
              "name": "methodology",
              "startWithNewLine": false,
              "title": "Methodology",
              "hasOther": true,
              "choices": [
                {
                  "value": "wci 1.0",
                  "text": "WCI 1.0"
                },
                {
                  "value": "wci 2.0",
                  "text": "WCI 2.0"
                },
                {
                  "value": "wci 3.0",
                  "text": "WCI 3.0"
                }
              ]
            }
          ],
          "templateTitle": "Fuel #{panelIndex}",
          "panelCount": 1,
          "minPanelCount": 1,
          "keyName": "name",
          "panelAddText": "Add another fuel",
          "panelRemoveText": "Remove fuel"
        }
      ],
      "title": "Fuel Usage"
    }
  ],
  "showQuestionNumbers": "off"
}'::jsonb
), (
    4,
    'Electricity and Heat',
   '{
  "title": "Electricity and Heat Information",
  "showCompletedPage": false,
  "pages": [
    {
      "name": "Electricity and Heat",
      "elements": [
        {
          "type": "paneldynamic",
          "name": "electricityAndHeat",
          "title": "Electricity and Heat",
          "templateElements": [
            {
              "type": "paneldynamic",
              "name": "electricity",
              "title": "Electricity (MWh)",
              "templateElements": [
                {
                  "type": "text",
                  "name": "description",
                  "startWithNewLine": false,
                  "title": "Purchased",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "generatedOnsite",
                  "startWithNewLine": false,
                  "title": "Generated Onsite",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "consumedOnsite",
                  "startWithNewLine": false,
                  "title": "Consumed Onsite",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "sold",
                  "width": "33.5%",
                  "title": "Sold",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "quantity",
                  "width": "66.5%",
                  "startWithNewLine": false,
                  "title": "Emissions from onsite generation (tCO2e)",
                  "inputType": "number"
                }
              ],
              "allowAddPanel": false,
              "allowRemovePanel": false,
              "panelCount": 1,
              "minPanelCount": 1,
              "keyName": "name",
              "panelAddText": "Add another fuel",
              "panelRemoveText": "Remove fuel"
            },
            {
              "type": "paneldynamic",
              "name": "heat",
              "title": "Heat (GJ)",
              "templateElements": [
                {
                  "type": "text",
                  "name": "description",
                  "title": "Purchased",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "generatedOnsite",
                  "startWithNewLine": false,
                  "title": "Generated Onsite",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "consumedOnsite",
                  "startWithNewLine": false,
                  "title": "Consumed Onsite",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "sold",
                  "width": "33.5%",
                  "title": "Sold",
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "quantity",
                  "width": "66.5%",
                  "startWithNewLine": false,
                  "title": "Emissions from onsite generation (tCO2e)",
                  "inputType": "number"
                }
              ],
              "allowAddPanel": false,
              "allowRemovePanel": false,
              "panelCount": 1,
              "minPanelCount": 1,
              "keyName": "name",
              "panelAddText": "Add another fuel",
              "panelRemoveText": "Remove fuel"
            }
          ],
          "templateTitle": "Fuel #{panelIndex}",
          "panelCount": 1,
          "minPanelCount": 1,
          "keyName": "name",
          "panelAddText": "Add another fuel",
          "panelRemoveText": "Remove fuel"
        }
      ],
      "title": "Electricity and Heat"
    }
  ],
  "showQuestionNumbers": "off"
}'::jsonb
), (
    5,
    'Production',
   '{
  "title": "Production Information",
  "showCompletedPage": false,
  "pages": [
    {
      "name": "Module Throughput and Emissions",
      "elements": [
        {
          "type": "paneldynamic",
          "name": "moduleThroughputAndProductionData",
          "title": "Production Data",
          "templateElements": [
            {
              "type": "dropdown",
              "name": "product",
              "title": "Processing Unit Module",
              "choices": [
                "Inlet Compression",
                "Dehydration",
                "Amine Sweetening",
                "Fractionation",
                "Stabilization"
              ]
            },
            {
              "type": "text",
              "name": "quantity",
              "title": "Quantity",
              "inputType": "number"
            },
            {
              "type": "dropdown",
              "name": "productUnits",
              "startWithNewLine": false,
              "title": "Units",
              "choices": [
                {
                  "value": "m3",
                  "text": "meters cube"
                },
                {
                  "value": "kl",
                  "text": "kiloliters"
                }
              ]
            },
            {
              "type": "text",
              "name": "associatedEmissions",
              "title": "Associated Emission (tCO2e)"
            },
            {
              "type": "text",
              "name": "attributableFuelPercentage",
              "startWithNewLine": false,
              "title": "Attributable % of Fuel",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "comments",
              "title": "Comments"
            }
          ],
          "templateTitle": "Processing Unit Module #{panelIndex}",
          "panelCount": 1,
          "minPanelCount": 1,
          "keyName": "name",
          "panelAddText": "Add another unit or product",
          "panelRemoveText": "Remove unit or product"
        }
      ],
      "title": "Module Throughput and Emissions",
      "description": "Please provide cumulative throughput/production amounts for each module as well as allocated emissions: "
    }
  ],
  "showQuestionNumbers": "off"
}'::jsonb
), (
    6,
    'Statement of Certification',
   '{
  "title": "Statement of Certification",
  "showCompletedPage": false,
  "pages": [
    {
      "name": "Statement of Certification",
      "elements": [
        {
          "type": "paneldynamic",
          "name": "certifyingOfficial",
          "title": "Certifying Official",
          "templateElements": [
            {
              "type": "html",
              "name": "text_line_1",
              "width": "5%",
              "startWithNewLine": false,
              "html": "<h5>I,</h5>"
            },
            {
              "type": "text",
              "name": "certifierName",
              "useDisplayValuesInTitle": false,
              "width": "30%",
              "startWithNewLine": false,
              "titleLocation": "hidden"
            },
            {
              "type": "html",
              "name": "textLine2",
              "width": "65%",
              "startWithNewLine": false,
              "html": "<h5>(Certifying Official), having the authority to bind the company applying, </h5>"
            },
            {
              "type": "html",
              "name": "certificationText",
              "html": "<h5>hereby certify that I have reviewed the information being submitted, that I have exercised due diligence to ensure that the information is true and complete, and that, to the best of my knowledge, the products and quantities submitted herein are accurate and based on reasonable estimates using available data; and agrees to repayment of incentive amounts erroneously paid or which are, upon audit or reconsideration by the Climate Action Secretariat, determined to either be inconsistent with the CleanBC Industrial Incentive Programs’ rules or not supported by evidence related to fuel usage and tax paid; and understand that any repayment amount may be deducted from a following year’s incentive payment.<h5>"
            },
            {
              "type": "file",
              "name": "signatureUpload",
              "width": "65%",
              "title": "Signature of Certifying Official",
              "maxSize": 0
            },
            {
              "type": "text",
              "name": "date",
              "width": "35%",
              "startWithNewLine": false,
              "title": "Date",
              "inputType": "date"
            },
            {
              "type": "panel",
              "name": "certifierContactDetails",
              "elements": [
                {
                  "type": "text",
                  "name": "firstName",
                  "startWithNewLine": false,
                  "title": "First Name",
                  "isRequired": true,
                  "size": 340
                },
                {
                  "type": "text",
                  "name": "lastName",
                  "startWithNewLine": false,
                  "title": "Last Name",
                  "isRequired": true,
                  "size": 340
                },
                {
                  "type": "text",
                  "name": "position",
                  "startWithNewLine": false,
                  "title": "Position/Title"
                },
                {
                  "type": "text",
                  "name": "emailAddress",
                  "title": "Email Address",
                  "isRequired": true,
                  "inputType": "email"
                },
                {
                  "type": "text",
                  "name": "phone",
                  "startWithNewLine": false,
                  "title": "Telephone Number",
                  "inputType": "tel"
                },
                {
                  "type": "text",
                  "name": "fax",
                  "startWithNewLine": false,
                  "title": "Fax Number",
                  "inputType": "tel"
                },
                {
                  "type": "text",
                  "name": "mailingAddressLine1",
                  "title": "Mailing Address"
                },
                {
                  "type": "text",
                  "name": "mailingAddressCity",
                  "startWithNewLine": false,
                  "title": "Mailing Address City"
                },
                {
                  "type": "dropdown",
                  "name": "mailingAddressProvince",
                  "startWithNewLine": false,
                  "title": "Province",
                  "choices": [
                    "Alberta",
                    "British Columbia",
                    "Manitoba",
                    "New Brunswick",
                    "Newfoundland and Labrador",
                    "Northwest Territories",
                    "Nova Scotia",
                    "Nunavut",
                    "Ontario",
                    "Prince Edward Island",
                    "Quebec",
                    "Saskatchewan",
                    "Yukon"
                  ]
                },
                {
                  "type": "text",
                  "name": "mailingAddressPostalCode",
                  "width": "32.5%",
                  "title": "Mailing Address Postal Code",
                  "validators": [
                    {
                      "type": "regex",
                      "text": "The postal code should match this pattern: A1A1A1",
                      "regex": "^([a-zA-Z]\\d){3}$"
                    }
                  ]
                }
              ]
            }
          ],
          "allowAddPanel": false,
          "allowRemovePanel": false,
          "panelCount": 1
        }
      ],
      "title": "Statement of Certification",
      "questionsOrder": "initial"
    }
  ],
  "showQuestionNumbers": "off"
}'::jsonb
)
on conflict (id) do nothing;

commit;
