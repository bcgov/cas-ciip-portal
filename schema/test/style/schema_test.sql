set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

set search_path to :schemas_to_test,public;

select * from no_plan();

/** Check schema compliance **/

-- Check schemas exist
with schema_names as (select schema_name from information_schema.schemata where schema_name = any (string_to_array(:'schemas_to_test', ',')))
select has_schema(sch)
from schema_names f(sch);

-- GUIDELINE: Schema has a description
-- Check schema for an existing description (regex '.+')
with schema_names as (select schema_name from information_schema.schemata where schema_name = any (string_to_array(:'schemas_to_test', ',')))
select matches(
               obj_description(sch::regnamespace, 'pg_namespace'),
               '.+',
               format('All schemas have a description. Violation: %I', sch)
           )
from schema_names f(sch);

-- GUIDELINE: Table names do not use reserved keywords as identifiers
select is_empty(
  $$
    select schema_name
    from information_schema.schemata
    where schema_name = any (string_to_array((SELECT setting FROM pg_settings WHERE name = 'search_path'), ', '))
    and schema_name in (select word from pg_get_keywords() where catcode !='U')
    order by schema_name
  $$,
  'Schemas do not use reserved keywords as identifiers. Violation format: {schema}'
);

select *
from finish();

rollback;
