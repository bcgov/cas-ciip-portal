set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(3);

set client_min_messages to warning;
truncate table ggircs_portal.fuel_emission_category restart identity cascade;
reset client_min_messages;

insert into ggircs_portal.fuel_emission_category (
    id,
    fuel_id,
    emission_category_id
)
overriding system value
 values (1,1,1), (2,1,2), (3,2,1);

select has_function(
  'ggircs_portal', 'fuel_ids_by_emission_category_id',
  'Function fuel_ids_by_emission_category_id should exist'
);

select is(
  (select count(*) from ggircs_portal.fuel_ids_by_emission_category_id()),
  2::bigint,
  'fuel_ids_by_emission_category_id returns one row per emission_category_id'
);

select is(
  (select fuel_ids from ggircs_portal.fuel_ids_by_emission_category_id() where emission_category_id=1),
  '{1,2}'::integer[],
  'the fuel_ids arrays returned by fuel_ids_by_emission_category_id contain all of the fuels associated with the rows emission_category_id'
);

select finish();

rollback;
