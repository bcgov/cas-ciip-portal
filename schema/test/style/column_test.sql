set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

set search_path to :schemas_to_test,public;

select * from no_plan();

/** Check Column Compliance **/

-- GUIDELINE: DB should have descriptions for all columns
-- Get all table columns that do not have a comment
prepare null_table_comment as select FORMAT('Violation(table, column): %s, %s', c.relname, a.attname)
    from pg_class as c
    inner join pg_attribute as a on c.oid = a.attrelid
    left join pg_namespace n on n.oid = c.relnamespace
    left join pg_tablespace t on t.oid = c.reltablespace
    left join pg_description as d on (d.objoid = c.oid and d.objsubid = a.attnum)
    where  c.relkind in('r')
      and  n.nspname = any (string_to_array(:'schemas_to_test', ','))
      and a.attnum > 0
      and a.attisdropped = false
      and d.description is null;
-- Test that there are no results on the above query for null comments
select is_empty(
               'null_table_comment', 'table columns have descriptions'
           );

-- Get all view columns that do not have a comment
prepare null_view_comment as select FORMAT('Violation(view, column): %s, %s', c.relname, a.attname)
    from pg_class as c
    inner join pg_attribute as a on c.oid = a.attrelid
    left join pg_namespace n on n.oid = c.relnamespace
    left join pg_tablespace t on t.oid = c.reltablespace
    left join pg_description as d on (d.objoid = c.oid and d.objsubid = a.attnum)
    where  c.relkind in('v')
      and  n.nspname = any (string_to_array(:'schemas_to_test', ','))
      and a.attnum > 0
      and d.description is null;
-- Test that there are no results on the above query for null comments
select is_empty(
    'null_view_comment', 'view columns have descriptions'
);

-- Get all materialized view columns that do not have a comment
prepare null_mv_comment as select FORMAT('Violation(materialized view, column): %s, %s', c.relname, a.attname)
    from pg_class as c
    inner join pg_attribute as a on c.oid = a.attrelid
    left join pg_namespace n on n.oid = c.relnamespace
    left join pg_tablespace t on t.oid = c.reltablespace
    left join pg_description as d on (d.objoid = c.oid and d.objsubid = a.attnum)
    where  c.relkind in('m')
      and  n.nspname = any (string_to_array(:'schemas_to_test', ','))
      and a.attnum > 0
      and d.description is null;
-- Test that there are no results on the above query for null comments
select is_empty(
               'null_mv_comment', 'materialized view columns have descriptions'
           );

-- GUIDELINE: Columns must have defined maximums for CHAR columns
-- Get all max char lengths from char columns in tables
prepare table_null_char_max as select columns.character_maximum_length
                   from information_schema.columns
                   where table_schema = any (string_to_array(:'schemas_to_test', ','))
                    and data_type like 'char%'
                    and columns.character_maximum_length is null;
-- Check there are no nulls for character_max_length when datatype is like 'char%'
select is_empty(
               'table_null_char_max', 'table char columns have defined maximums'
           );

-- Get all max char lengths from char columns in materialized views
prepare mv_null_char_max as select a.attname,
           pg_catalog.format_type(a.atttypid, a.atttypmod),
           a.atttypmod
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'm'
        and s.nspname = any (string_to_array(:'schemas_to_test', ','))
        and pg_catalog.format_type(a.atttypid, a.atttypmod) like '%char%'
        and a.atttypmod < 0;
-- Check there are no nulls for character_max_length when datatype is like 'char%'
select is_empty('mv_null_char_max', 'Material view char columns have defined maximums');

-- GUIDELINE: Columns must be defined by an accepted data_type
-- Get all table columns that have an undefined data_type
prepare table_improper_datatype as select FORMAT('Violation(table, column, datatype): %s, %s, %s', t.relname, a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod))
        from pg_attribute a
        join pg_class t on a.attrelid = t.oid
        join pg_namespace s on t.relnamespace = s.oid
        where a.attnum > 0
        and not a.attisdropped
        and t.relkind = 'r'
        and s.nspname = any (string_to_array(:'schemas_to_test', ','))
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
        and s.nspname = any (string_to_array(:'schemas_to_test', ','))
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
        and s.nspname = any (string_to_array(:'schemas_to_test', ','))
        and (
            pg_catalog.format_type(a.atttypid, a.atttypmod) is null
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'text'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'clob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'blob'
            or pg_catalog.format_type(a.atttypid, a.atttypmod) = 'xml_type'
            );

select is_empty('mv_improper_datatype', 'materialized view columns must be defined by an accepted data_type');

-- GUIDELINE: Names are lower-case with underscores_as_word_separators
-- Check that all columns names match format: lowercase, starts with a letter charater, separated by underscores
with cnames as (select column_name from information_schema.columns where table_schema = any (string_to_array(:'schemas_to_test', ',')))
select matches(
               col,
               '^[a-z]+[a-z0-9]*(?:_[a-z0-9]+)*',
               'column names are lower-case and separated by underscores'
           )
from cnames f(col);

-- GUIDELINE: Column names do not use reserved keywords as identifiers
select is_empty(
  $$
    select table_schema, table_name, column_name
    from information_schema.columns
    where table_schema = any (string_to_array((SELECT setting FROM pg_settings WHERE name = 'search_path'), ', '))
    and column_name in (select word from pg_get_keywords() where catcode !='U')
    order by table_schema, table_name
  $$,
  'Columns do not use reserved keywords as identifiers. Violation format: {schema, table, column}'
);

select * from finish();

rollback;
