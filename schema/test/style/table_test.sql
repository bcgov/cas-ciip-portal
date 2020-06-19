set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

set search_path to ggircs_portal,ggircs_portal_private,public;

select * from no_plan();

/** Check table compliance **/

-- GUIDELINE: All tables should have descriptions
-- Check all tables for an existing description (regex '.+')
with tnames as (select table_name from information_schema.tables
                    where table_schema like 'ggircs_portal%'
               )
select matches(
               obj_description(tbl::regclass, 'pg_class'),
               '.+',
               format('Table has a description. Violation: %I', tbl)
           )
from tnames f(tbl);

--GUIDELINE GROUP: Enforce table naming conventions
-- GUIDELINE: Names are lower-case with underscores_as_word_separators
-- Check that all table names do not return a match of capital letters or non-word characters
with tnames as (select table_name from information_schema.tables where table_schema like 'ggircs_portal%')
select doesnt_match(
               tbl,
               '[A-Z]|\W',
               format('Table names are lower-case and separated by underscores. Violation: %I', tbl)
           )
from tnames f(tbl);

-- TODO: Names are singular
-- POSTGRES stemmer
-- ACTIVE RECORD (Ruby/Rails)

-- GUIDELINE: Avoid reserved keywords (ie. COMMENT -> [name]_comment) https://www.drupal.org/docs/develop/coding-standards/list-of-sql-reserved-words
-- create table from csv list of reserved words
create table csv_import_fixture
(
    csv_column_fixture text
);
\copy csv_import_fixture from './test/fixture/sql_reserved_words.csv' delimiter ',' csv;
-- test that schema does not contain any table names that intersect with reserved words csv dictionary
with reserved_words as (select csv_column_fixture from csv_import_fixture),
schema_names as (select schema_name from information_schema.schemata where schema_name like 'ggircs_portal%')
select hasnt_table(
               sch,
               res,
               format('Table names avoid reserved keywords. Violation: %I', res)
           )
from reserved_words as rtmp (res)
cross join schema_names as stmp (sch);
drop table csv_import_fixture;

-- GUIDELINE: All tables must have a unique primary key
-- pg_TAP built in test functuon for checking all tables in schema have a primary key
with tnames as (select table_name from information_schema.tables where table_schema like 'ggircs_portal%' and table_type != 'VIEW')
select has_pk(
               tbl, format('Table has primary key. Violation: %I', tbl)
           )
from tnames f(tbl);

-- TODO: Related tables must have foreign key constraints : FK column names must match PK name from parent

select *
from finish();

rollback;
