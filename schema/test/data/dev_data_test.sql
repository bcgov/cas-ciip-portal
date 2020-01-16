set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(14);

-- Following dev data (including prod & test) should exist

prepare reporting_year_data as select * from ggircs_portal.reporting_year;
prepare form_json_data as select * from ggircs_portal.form_json;
prepare ciip_application_wizard_data as select * from ggircs_portal.ciip_application_wizard;
prepare fuel_data as select * from ggircs_portal.fuel;
prepare product_form_data as select * from ggircs_portal.product_form;
prepare product_data as select * from ggircs_portal.product;
prepare organisation_data as select * from ggircs_portal.organisation;
prepare facility_data as select * from ggircs_portal.facility;
prepare gas_data as select * from ggircs_portal.gas;
prepare benchmark_data as select * from ggircs_portal.benchmark;
prepare user_data as select * from ggircs_portal.ciip_user;
prepare certification_url_data as select * from ggircs_portal.certification_url;
prepare application_data as select * from ggircs_portal.application;
prepare form_result_data as select * from ggircs_portal.form_result;

select isnt_empty('reporting_year_data', 'reporting_year table should not be empty');
select isnt_empty('form_json_data', 'form_json table should not be empty');
select isnt_empty('ciip_application_wizard_data', 'ciip_application_wizard table should not be empty');
select isnt_empty('fuel_data', 'fuel table should not be empty');
select isnt_empty('product_form_data', 'product_form table should not be empty');
select isnt_empty('product_data', 'product table should not be empty');
select isnt_empty('organisation_data', 'organisation table should not be empty');
select isnt_empty('facility_data', 'facility table should not be empty');
select isnt_empty('gas_data', 'gas table should not be empty');
select isnt_empty('benchmark_data', 'benchmark table should not be empty');
select isnt_empty('user_data', 'ciip_user table should be empty');
select isnt_empty('certification_url_data', 'certification_url table should be empty');
select isnt_empty('application_data', 'application table should be empty');
select isnt_empty('form_result_data', 'form_result table should be empty');

select finish();
rollback;
