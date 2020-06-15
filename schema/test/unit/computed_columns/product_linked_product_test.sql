set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'product_linked_product', array['ggircs_portal.product'],
  'Function ggircs_portal.product_linked_product should exist'
);

truncate ggircs_portal.linked_product restart identity cascade;
alter table ggircs_portal.product disable trigger _protect_read_only_products;

insert into ggircs_portal.linked_product(product_id, linked_product_id) values
(11,12), (11,13), (11,14), (11,15), (12,16), (13,17);

select set_eq(
  $$
    with prod as (select row(p.*)::ggircs_portal.product from ggircs_portal.product p where id=11)
    select linked_product_id from ggircs_portal.product_linked_product((select * from prod));
  $$,
  ARRAY['12'::integer, '13'::integer, '14'::integer, '15'::integer],
  'Computed column returns the linked products for the input product'
);

update ggircs_portal.product set product_state='archived' where id=12;
update ggircs_portal.product set product_state='draft' where id=13;

select set_eq(
  $$
    with prod as (select row(p.*)::ggircs_portal.product from ggircs_portal.product p where id=11)
    select linked_product_id from ggircs_portal.product_linked_product((select * from prod));
  $$,
  ARRAY['14'::integer, '15'::integer],
  'Computed column only returns the linked products in state published for the input product'
);

select finish();

rollback;
