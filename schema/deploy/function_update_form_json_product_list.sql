-- Deploy ggircs-portal:function_update_form_json_product_list to pg
-- requires: table_form_json

BEGIN;

create or replace function ggircs_portal.update_form_json_product_list()
    returns trigger as
    $function$
        begin
                update ggircs_portal.form_json
                    set form_json = concat('
                    {
                    "title": "CIIP Application (master)",
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
                        "name": "fuel_type",
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
                        "name": "fuel_units",
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
                    },
                    {
                    "name": "Electricity and Heat",
                    "elements": [
                        {
                        "type": "paneldynamic",
                        "name": "electricity_and_heat",
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
                            "name": "generated_onsite",
                            "startWithNewLine": false,
                            "title": "Generated Onsite",
                            "inputType": "number"
                            },
                            {
                            "type": "text",
                            "name": "consumed_onsite",
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
                            "name": "generated_onsite",
                            "startWithNewLine": false,
                            "title": "Generated Onsite",
                            "inputType": "number"
                            },
                            {
                            "type": "text",
                            "name": "consumed_onsite",
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
                    },
                    {
                    "name": "Module Throughput and Emissions",
                    "elements": [
                        {
                        "type": "paneldynamic",
                        "name": "module_throughput_and_production_data",
                        "title": "Production Data",
                        "templateElements": [
                        {
                        "type": "dropdown",
                        "name": "processing_unit",
                        "title": "Processing Unit Module",
                        "choices": []
                        },
                        {
                        "type": "text",
                        "name": "quantity",
                        "title": "Quantity",
                        "inputType": "number"
                        },
                        {
                        "type": "dropdown",
                        "name": "units",
                        "startWithNewLine": false,
                        "title": "Units",
                        "choices": []
                        },
                        {
                        "type": "text",
                        "name": "associated_emissions",
                        "title": "Associated Emission (tCO2e)"
                        },
                        {
                        "type": "text",
                        "name": "attributable_fuel_percentage",
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
                    },
                    {
                    "name": "Statement of Certification",
                    "elements": [
                        {
                        "type": "paneldynamic",
                        "name": "certifiying_official",
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
                        "name": "certifier_name",
                        "useDisplayValuesInTitle": false,
                        "width": "30%",
                        "startWithNewLine": false,
                        "titleLocation": "hidden"
                        },
                        {
                        "type": "html",
                        "name": "text_line_2",
                        "width": "65%",
                        "startWithNewLine": false,
                        "html": "<h5>(Certifying Official), having the authority to bind the company applying, </h5>"
                        },
                        {
                        "type": "html",
                        "name": "certification_text",
                        "html": "<h5>hereby certify that I have reviewed the information being submitted, that I have exercised due diligence to ensure that the information is true and complete, and that, to the best of my knowledge, the products and quantities submitted herein are accurate and based on reasonable estimates using available data; and agrees to repayment of incentive amounts erroneously paid or which are, upon audit or reconsideration by the Climate Action Secretariat, determined to either be inconsistent with the CleanBC Industrial Incentive Programs’ rules or not supported by evidence related to fuel usage and tax paid; and understand that any repayment amount may be deducted from a following year’s incentive payment.<h5>"
                        },
                        {
                        "type": "file",
                        "name": "signature_upload",
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
                        "name": "certifier_contact_details",
                        "elements": [
                            {
                            "type": "text",
                            "name": "first_name",
                            "startWithNewLine": false,
                            "title": "First Name",
                            "isRequired": true,
                            "size": 340
                            },
                            {
                            "type": "text",
                            "name": "last_name",
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
                            "name": "email_address",
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
                            "name": "mailing_address_line_1",
                            "title": "Mailing Address"
                            },
                            {
                            "type": "text",
                            "name": "mailing_address_city",
                            "startWithNewLine": false,
                            "title": "Mailing Address City"
                            },
                            {
                            "type": "dropdown",
                            "name": "mailing_address_province",
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
                            "name": "mailing_address_postal_code",
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
                    }
                        ')::jsonb
                    where name = 'CIIP Application (master)';
            return null;
        end
    $function$ language plpgsql volatile;

COMMIT;
