set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(8);

-- Following prod data should exist

prepare reporting_year_data as select * from ggircs_portal.reporting_year;
prepare fuel_data as select * from ggircs_portal.fuel;
prepare gas_data as select * from ggircs_portal.gas;
prepare emission_category_gas_data as select * from ggircs_portal.emission_category_gas;

select isnt_empty('reporting_year_data', 'reporting_year table should not be empty');
select isnt_empty('fuel_data', 'fuel table should not be empty');
select isnt_empty('gas_data', 'gas table should not be empty');
select isnt_empty('emission_category_gas_data', 'emission_category_gas table should not be empty');

-- Following data are not prod and tables should be empty

prepare benchmark_data as select * from ggircs_portal.benchmark;
prepare user_data as select * from ggircs_portal.ciip_user;
prepare application_data as select * from ggircs_portal.application;
prepare certification_url_data as select * from ggircs_portal.certification_url;

select is_empty('benchmark_data', 'benchmark table should be empty');
select is_empty('user_data', 'ciip_user table should be empty');
select is_empty('application_data', 'application table should be empty');
select is_empty('certification_url_data', 'certification_url table should be empty');

select finish();
rollback;
