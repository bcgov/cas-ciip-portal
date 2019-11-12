set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

-- create schema ggircs_portal;
set search_path to ggircs_portal,public;

select * from no_plan();

/** Check Column Compliance **/

-- GUIDELINE: DB should have descriptions for all columns
-- Get all table columns within schema ggircs_portal that do not have a comment
prepare null_table_comment as select FORMAT('Violation(table, column): %s, %s', c.relname, a.attname)
    from pg_class as c
    inner join pg_attribute as a on c.oid = a.attrelid
    left join pg_namespace n on n.oid = c.relnamespace
    left join pg_tablespace t on t.oid = c.reltablespace
    left join pg_description as d on (d.objoid = c.oid and d.objsubid = a.attnum)
    where  c.relkind in('r')
      and  n.nspname = 'ggircs_portal'
      and a.attnum > 0
      and d.description is null;
-- Test that there are no results on the above query for null comments
select is_empty(
               'null_table_comment', 'table columns have descriptions'
           );

prepare null_view_comment as select FORMAT('Violation(view, column): %s, %s', c.relname, a.attname)
    from pg_class as c
    inner join pg_attribute as a on c.oid = a.attrelid
    left join pg_namespace n on n.oid = c.relnamespace
    left join pg_tablespace t on t.oid = c.reltablespace
    left join pg_description as d on (d.objoid = c.oid and d.objsubid = a.attnum)
    where  c.relkind in('v')
      and  n.nspname = 'ggircs_portal'
      and a.attnum > 0
      and d.description is null;
-- Test that there are no results on the above query for null comments
select is_empty(
               'null_view_comment', 'view columns have descriptions'
           );

-- Get all materialized view columns in schema ggrics_swrs that do not have a comment
prepare null_mv_comment as select FORMAT('Violation(materialized view, column): %s, %s', c.relname, a.attname)
    from pg_class as c
    inner join pg_attribute as a on c.oid = a.attrelid
    left join pg_namespace n on n.oid = c.relnamespace
    left join pg_tablespace t on t.oid = c.reltablespace
    left join pg_description as d on (d.objoid = c.oid and d.objsubid = a.attnum)
    where  c.relkind in('m')
      and  n.nspname = 'ggircs_portal'
      and a.attnum > 0
      and d.description is null;
-- Test that there are no results on the above query for null comments
select is_empty(
               'null_mv_comment', 'materialized view columns have descriptions'
           );

-- GUIDELINE: Columns must have defined maximums for CHAR columns
-- Get all max char lengths from char tables
prepare table_null_char_max as select columns.character_maximum_length
                   from information_schema.columns
                   where table_schema = 'ggircs_portal'
                    and data_type like 'char%'
                    and columns.character_maximum_length is null;
-- Check there are no nulls for character_max_length when datatype is like 'char%'
select is_empty(
               'table_null_char_max', 'table char columns have defined maximums'
           );

-- Get all max char lengths from char material views
prepare mv_null_char_max as select a.attname,
           pg_catalog.format_type(a.atttypid, a.atttypmod),
           a.atttypmod
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'm'
        and s.nspname = 'ggircs_portal'
        and pg_catalog.format_type(a.atttypid, a.atttypmod) like '%char%'
        and a.atttypmod < 0;
-- Check there are no nulls for character_max_length when datatype is like 'char%'
select is_empty('mv_null_char_max', 'Material view char columns have defined maximums');

-- GUIDELINE: Columns must have defined Scale and Precision for NUMERIC columns
-- Get all table numeric data types that return null when queried for their precision or scale
prepare table_null_numeric_precision as select columns.numeric_precision, columns.numeric_scale
                      from information_schema.columns
                      where table_schema = 'ggircs_portal'
                        and data_type = 'numeric'
                        and (columns.numeric_precision is null or columns.numeric_scale is null);
-- Check that the result of the above query is empty
-- select is_empty(
--                'table_null_numeric_precision', 'numeric columns have precison and scale'
--            );

-- Get all materialized view numeric data types that return null when queried for their precision or scale
prepare mv_null_num_precision as select a.attname,
           pg_catalog.format_type(a.atttypid, a.atttypmod),
           a.atttypmod
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'm'
        and s.nspname = 'ggircs_portal'
        and a.atttypmod < 0
        and pg_catalog.format_type(a.atttypid, a.atttypmod) = 'numeric';
-- Check there are no nulls for precision/scale when datatype is numeric
-- select is_empty('mv_null_num_precision', 'Material view numeric columns have defined precision and scale');

-- GUIDELINE: Columns must be defined by an accepted data_type
-- Get all table columns that have an undefined data_type
prepare table_improper_datatype as select FORMAT('Violation(table, column, datatype): %s, %s, %s', t.relname, a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod))
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'r'
        and s.nspname = 'ggircs_portal'
        and (
            pg_catalog.format_type(a.atttypid, a.atttypmod) is null
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'text'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'clob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'blob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'xml_type'
            );
-- Check that the results returned by the above prepared statement are empty (no undefined data_types)
select is_empty('table_improper_datatype', 'table columns must be defined by an accepted data_type');

-- Get all view columns that have an undefined data_type
prepare view_improper_datatype as select FORMAT('Violation(view, column, datatype): %s, %s, %s', t.relname, a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod))
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'v'
        and s.nspname = 'ggircs_portal'
        and (
            pg_catalog.format_type(a.atttypid, a.atttypmod) is null
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'text'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'clob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'blob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'xml_type'
            );
-- Check that the results returned by the above prepared statement are empty (no undefined data_types)
select is_empty('view_improper_datatype', 'view columns must be defined by an accepted data_type');

-- Get all materialized view columns that have an undefined data_type
prepare mv_improper_datatype as select FORMAT('Violation(materialized view, column, datatype): %s, %s, %s', t.relname, a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod))
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'm'
        and s.nspname = 'ggircs_portal'
        and (
            pg_catalog.format_type(a.atttypid, a.atttypmod) is null
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'text'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'clob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'blob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'xml_type'
            );

select is_empty('mv_improper_datatype', 'materialized view columns must be defined by an accepted data_type');
/*
-- GUIDELINE GROUP: Enforce column naming conventions
-- GUIDELINE: Names are lower-case with underscores_as_word_separators
-- Check that all columns in schema do not return a match of capital letters or non-word characters
with cnames as (select column_name from information_schema.columns where table_schema = 'ggircs_portal')
select doesnt_match(
               col,
               '[A-Z]|\W',
               'column names are lower-case and separated by underscores'
           )
from cnames f(col);

-- TODO: Names are singular

-- GUIDELINE: Avoid reserved keywords (ie. COMMENT -> [name]_comment) https://www.drupal.org/docs/develop/coding-standards/list-of-sql-reserved-words
-- create table from csv list of reserved words
create table csv_import_fixture
(
    csv_column_fixture text
);
\copy csv_import_fixture from './test/fixture/sql_reserved_words.csv' delimiter ',' csv;
-- test that all tables in schema do not contain any column names that intersect with reserved words csv dictionary
with reserved_words as (select csv_column_fixture from csv_import_fixture),
     tnames as (select table_name from information_schema.tables where table_schema = 'ggircs_portal')
select hasnt_column(
               'ggircs_portal',
               tbl,
               word,
               format('Column names avoid reserved keywords. Violation: col: %I, word: %I', tbl, word)
           )
from reserved_words as wtmp (word)
         cross join tnames as ttmp (tbl);
with reserved_words as (select csv_column_fixture from csv_import_fixture),
mv_names as (select a.attname
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'm'
        and s.nspname = 'ggircs_portal')
select hasnt_column(
               'ggircs_portal',
               mv,
               word,
               format('Column names avoid reserved keywords. Violation: col: %I, word: %I', mv, word)
           )
from reserved_words as wtmp (word)
         cross join mv_names as mvtmp (mv);
*/

select * from finish();

rollback;
