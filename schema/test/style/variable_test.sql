set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(1);

create schema :dummy_schema;
set search_path to :dummy_schema,public;

-- Test fixture exists
create table csv_import_fixture
(
    csv_column_fixture text
);
\copy csv_import_fixture from './test/fixture/csv_import_fixture.csv' delimiter ',' csv;
select set_eq(
               'select * from csv_import_fixture',
               array [ 'value exists' ]
           );

select *
from finish();

rollback;
