set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

set search_path to :schemas_to_test,public;

select * from no_plan();

/** Check table compliance **/

-- GUIDELINE: All tables should have descriptions
-- Check all tables for an existing description (regex '.+')
with tnames as (select table_name from information_schema.tables
                    where table_schema = any (string_to_array(:'schemas_to_test', ','))
               )
select matches(
               obj_description(tbl::regclass, 'pg_class'),
               '.+',
               format('Table has a description. Violation: %I', tbl)
           )
from tnames f(tbl);

-- GUIDELINE: Names are lower-case with underscores_as_word_separators
-- Check that all table names match format: lowercase, starts with a letter charater, separated by underscores
with tnames as (select table_name from information_schema.tables where table_schema = any (string_to_array(:'schemas_to_test', ',')))
select matches(
               tbl,
               '^[a-z]+[a-z0-9]*(?:_[a-z0-9]+)*',
               'table names are lower-case and separated by underscores'
           )
from tnames f(tbl);

-- GUIDELINE: Table names do not use reserved keywords as identifiers
select is_empty(
  $$
    select table_schema, table_name
    from information_schema.tables
    where table_schema = any (string_to_array((SELECT setting FROM pg_settings WHERE name = 'search_path'), ', '))
    and table_name in (select word from pg_get_keywords() where catcode !='U')
    order by table_schema, table_name
  $$,
  'Tables do not use reserved keywords as identifiers. Violation format: {schema, table}'
);

select * from finish();

rollback;
