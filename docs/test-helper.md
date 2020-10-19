# Test Helper Schema

## Deploying the test-helper schema

The test helper schema is deployed automatically for pgTap tests, the make target `make unit` deploys the schema & functions to the test db. The schema is also deployed by CI to the dev db in order to run the cypress e2e tests.

For running e2e tests locally, the schema must be deployed manually. This can be done from the test_helper_schema directory with `SQITCH_TARGET="ciip_portal_dev" sqitch deploy`.

## Function Definitions

### CERTIFY_APPLICATION

#### Description
Certifies an application by creating a row in ggircs_portal.certification_url with the same type of randomly generated ID that would be applied with production use of the app.

#### Parameters
**app_id (int)**: The ID of the application to certify.
**v_number (int)**: The version number of the application to certify.
**certifier_id (int)**: The ID of the user that will be set to certified_by (user with id=7 is Test Certifier).


### CLEAN_GGIRCS_PORTAL_SCHEMA

#### Description
Iterates over all tables in the ggircs_portal schema with `truncate <table> restart identity cascade`. This results in wiping all data from the tables and resetting the id sequences.

#### Parameters
None

#### Example Usage
This can be called manually with `select test_helper.clean_ggircs_portal_schema()`.
The call has been added to the list of cypress commands and should be called in the `before()` and/or the `beforeEach()` section of a Cypress spec with `cy.cleanSchema()`.


### CREATE_APPLICATIONS

#### Description
Create a defined number of applications. If `create_dependencies` is false, then only the applications are created. This allows some flexibility if it is necessary to create / mutate the organisation or facility dependencies before the application is created. If set to true, the function creates the necessary rows in the organisation/facility tables that are needed for the application to exist.

#### Parameters
**app_count (integer)**: The number of applications to create.
**same_organisation (boolean)**: If set to true, all applications (and dependent facilities) are created under one organisation. If false, a different organisation and facility is created for each application.
**create_dependencies (boolean)**: If set to true, creates the necessary parent organisation(s) and facilities.

#### Example Usage
`select test_helper.create_applications(4, True, True)`
- This will create 4 applications for 4 facilities under 1 organisation.
`select test_helper.create_applications(4, False, True)`
- This will create 4 applications for 4 facilities under 4 organisations.
`select test_helper.create_applications(4, True, False)`
- This will require that 1 organisation and 4 facilities have already been created.
`select test_helper.create_applications(4, False, False)`
- This will require that 4 organisations and 4 facilities have already been created.


### CREATE_PRODUCT

#### Description
Create a row in the product table with a defined id.

#### Parameters
Takes all parameters for columns in the ggircs_portal.product table. Only id is required.
(id, product_name, units, product_state, is_ciip_product, requres_emission_allocation, requires_product_amount, subtract_exported_electricity_emissions, add_purchased_electricity_emissions, subtract_exported_heat_emissions, add_purchased_heat_emissions, subtract_generated_electricity_emissions, subtract_generated_heat_emissions, add_emissions_from_eios, is_read_only, updated_at)

#### Example Usage
`select test_helper.create_product(id => 11, product_name => 'Product A', units => 'tonnes', is_read_only => false)`
- Will create a product with id=11 named 'Product A'


### CREATE_TEST_USERS

#### Description
Create a set of 7 pre-defined test users with different roles.

#### Parameters
None

#### Example Usage
`select test_helper.create_test_users()`


### INITIALIZE_FORM_RESULT_DATA

#### Description
Mutates data in the ggircs_portal.form_result table for individual forms. Based on a seed, data can be changed.

#### Parameters
**application_id (int)**: The application ID of the form result to modify.
**version_number (int)**: The version_number of the form result to modify.
**form_id (int)**: The form_id of the form result to modify.
**seed (int)**: Use this value to modify the data in the form_result table.

#### Example Usage
`select test_helper.initialize_form_result_data(1, 1, 1, 1);`
- Would modify the data for form_result with application_id=1, version_number=1 and form_id=1


### INITIALIZE_ALL_FORM_RESULT_DATA

#### Description
Mutates data in all the forms (Admin, Emission, Fuel & Production). Helpful when creating an application that needs data everywhere.

#### Parameters
**application_id (int)**: The application ID of the form result to modify.
**version_number (int)**: The version_number of the form result to modify.
**seed (int)**: Use this value to modify the data in the form_result table.

#### Example Usage
`select test_helper.initialize_form_result_data(1, 1, 1, 1);`
- Would populate all the forms for application_id=1, version_number=1


### MOCK_OPEN_WINDOW

#### Description
Creates one row in the ggircs_portal.reporting_year table with dynamic dates in order to put the test environment in a state where applications can be started.

#### Parameters
None

#### Example Usage
`select test_helper.mock_open_window()`


### MODIFY_TRIGGERS

#### Description
Enable or disable triggers on the tables in the ggircs_portal schema. This is an [overloaded](https://www.postgresql.org/docs/8.2/xfunc-overload.html) function. Calling this function with only `trigger_action` defined will enable or disable all triggers on all tables in the ggircs_portal schema. Defining the second `trigger_data` parameter as a list of tables & triggers in JSON format will selectively enable or disable those triggers

#### Parameters
**trigger_action (text)**: Valid values are `enable` or `disable`. Action to take on the triggers.
**trigger_data (json)**: A JSON object containing a set of tables that each contain a list of triggers to be enabled or disabled.

#### Example Usage
`select test_helper.modify_triggers('disable')`
- This will disable all triggers on all tables in the ggircs_portal database.
`select test_helper.modify_triggers('disable', '{"table_1":["trigger_1","trigger_2",...], "table_2":["trigger_1, ...]}')`
- This will disable only the triggers on the tables defined in the JSON object.
