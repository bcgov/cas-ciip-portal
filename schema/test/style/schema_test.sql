set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(4);

/** Check schema compliance **/

-- Check schemas like ggircs_portal%  exist
with schema_names as (select schema_name from information_schema.schemata where schema_name like 'ggircs_portal%')
select has_schema(sch)
from schema_names f(sch);

-- GUIDELINE: Schema has a description
-- Check schema for an existing description (regex '.+')
with schema_names as (select schema_name from information_schema.schemata where schema_name like 'ggircs_portal%')
select matches(
               obj_description(sch::regnamespace, 'pg_namespace'),
               '.+',
               format('All schemas have a description. Violation: %I', sch)
           )
from schema_names f(sch);

select *
from finish();

rollback;
