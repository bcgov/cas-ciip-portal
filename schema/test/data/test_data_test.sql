set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(7);

-- Following test data (including prod) should exist

prepare form_json_data as select * from ggircs_portal.form_json;
prepare product_data as select * from ggircs_portal.product;
prepare gas_data as select * from ggircs_portal.gas;
prepare benchmark_data as select * from ggircs_portal.benchmark;

select isnt_empty('form_json_data', 'form_json table should not be empty');
select isnt_empty('product_data', 'product table should not be empty');
select isnt_empty('gas_data', 'gas table should not be empty');
select isnt_empty('benchmark_data', 'benchmark table should not be empty');

-- Following data are not test and tables should be empty

prepare application_revision_data as select * from ggircs_portal.application_revision;
prepare application_revision_status_data as select * from ggircs_portal.application_revision_status;
prepare form_result_data as select * from ggircs_portal.form_result;

select is_empty('application_revision_data', 'application_revision table should be empty');
select is_empty('application_revision_status_data', 'application_revision_status table should be empty');
select is_empty('form_result_data', 'form_result table should be empty');

select finish();
rollback;
