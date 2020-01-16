set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(2);

select has_function(
  'ggircs_portal', 'search_products', array['text', 'text', 'text', 'text'],
  'Function search_products should exist'
);

select is(
  (select count(*) from ggircs_portal.search_products(null, null)),
  (select count(*) from ggircs_portal.product),
  'The search_products function should return all the products if there is no filter');

select finish();

rollback;
