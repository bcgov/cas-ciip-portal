set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

--TODO: **Will likely need to be updated to include materialized views when looping through all tables**
    -- ie: join table_name and materialized_view_name then loop through the joined result

begin;

-- TODO: set search_path to change dynamically for each schema
set search_path to ggircs_portal,public;

select * from no_plan();

/** Check table compliance **/

-- GUIDELINE: All tables should have descriptions
-- Check all tables for an existing description (regex '.+')
with mvnames as (select matviewname from pg_matviews where schemaname like 'ggircs%')
select matches(
               obj_description(mv::regclass, 'pg_class'),
               '.+',
               format('Materialized view has a description. Violation: %I', mv)
           )
from mvnames f(mv);
--
-- --GUIDELINE GROUP: Enforce table naming conventions
-- -- GUIDELINE: Names are lower-case with underscores_as_word_separators
-- -- Check that all materialized view names do not return a match of capital letters or non-word characters
with mvnames as (select matviewname from pg_matviews where schemaname like 'ggircs%')
select doesnt_match(
               mv,
               '[A-Z]|\W',
               format('Materialized view names are lower-case and separated by underscores. Violation: %I', mv)
           )
from mvnames f(mv);
--
-- -- TODO: Names are singular
-- -- POSTGRES stemmer
-- -- ACTIVE RECORD (Ruby/Rails)

-- -- GUIDELINE: Avoid reserved keywords (ie. COMMENT -> [name]_comment) https://www.drupal.org/docs/develop/coding-standards/list-of-sql-reserved-words
-- -- create table from csv list of reserved words
create table csv_import_fixture
(
    csv_column_fixture text
);
\copy csv_import_fixture from './test/fixture/sql_reserved_words.csv' delimiter ',' csv;
-- -- test that schema does not contain any table names that intersect with reserved words csv dictionary
with reserved_words as (select csv_column_fixture from csv_import_fixture),
mv_names as (select matviewname from pg_matviews where schemaname like 'ggircs%')
select hasnt_materialized_view(
               mv,
               res,
               format('Materialized view names avoid reserved keywords. Violation: %I', res)
           )
from reserved_words as rtmp (res)
cross join mv_names as stmp (mv);
drop table csv_import_fixture;
--
-- GUIDELINE: All materialized views must have a primary key
-- Get all materialized views in schema that do not have an index matching %primary%
prepare null_pkey as select tablename from pg_indexes where not exists (select indexname from pg_indexes where indexname like '%primary%') and schemaname = 'ggircs';
-- Test that the above query returns nothing, else throw an error
select is_empty('null_pkey', 'All materialized views must have a primary key');

-- -- TODO: Related tables must have foreign key constraints : FK column names must match PK name from parent

select * from finish();

rollback;
