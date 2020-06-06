/**
  create product links for dev purposes only
**/

begin;

  with rows as (
  insert into ggircs_portal.product_link(id, product_id, linked_product_id)
  overriding system value
  values
  (1, 32, 33),
  (2, 32, 34),
  (3, 32, 35),
  (4, 37, 38)
  on conflict(id) do update set
    product_id=excluded.product_id,
    linked_product_id=excluded.linked_product_id
  returning 1
  ) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product_link' from rows;

  select setval from
  setval('ggircs_portal.product_link_id_seq', (select max(id) from ggircs_portal.product_link), true)
  where setval = 0;

commit;
