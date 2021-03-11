set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'product_current_benchmark', array['ggircs_portal.product'],
  'Function product_current_benchmark should exist'
);

with record as (select row(product.*)::ggircs_portal.product from ggircs_portal.product where id=1)
    select pg_typeof((select ggircs_portal.product_current_benchmark((select * from record))));

select results_eq (
  $$
    with record as (select row(product.*)::ggircs_portal.product from ggircs_portal.product where id=1)
    select pg_typeof((select ggircs_portal.product_current_benchmark((select * from record))))
  $$,
  ARRAY['numeric'::regtype],
  'product_current_benchmark returns scalar type numeric'
);

select results_eq (
  $$
    with record as (select row(product.*)::ggircs_portal.product from ggircs_portal.product where id=1)
    select ggircs_portal.product_current_benchmark((select * from record))
  $$,
  ARRAY[(select benchmark from ggircs_portal.benchmark where product_id=1 order by id desc)::numeric],
  'product_current_benchmark returns the current benchmark when passed an product object'
);

select finish();
rollback;
