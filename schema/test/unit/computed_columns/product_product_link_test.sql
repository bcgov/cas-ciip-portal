set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'product_product_link', array['ggircs_portal.product'],
  'Function ggircs_portal.product_product_link should exist'
);

truncate ggircs_portal.product_link restart identity cascade;
alter table ggircs_portal.product disable trigger _protect_read_only_products;

insert into ggircs_portal.product_link(product_id, linked_product_id) values
(1,2), (1,3), (1,4), (1,5), (2,6), (3,7);

select set_eq(
  $$
    with prod as (select row(p.*)::ggircs_portal.product from ggircs_portal.product p where id=1)
    select id from ggircs_portal.product_product_link((select * from prod));
  $$,
  ARRAY['2'::integer, '3'::integer, '4'::integer, '5'::integer],
  'Computed column returns the linked products for the input product'
);

update ggircs_portal.product set product_state='archived' where id=2;
update ggircs_portal.product set product_state='draft' where id=3;

select set_eq(
  $$
    with prod as (select row(p.*)::ggircs_portal.product from ggircs_portal.product p where id=1)
    select id from ggircs_portal.product_product_link((select * from prod));
  $$,
  ARRAY['4'::integer, '5'::integer],
  'Computed column only returns the linked products in state published for the input product'
);

select finish();

rollback;
