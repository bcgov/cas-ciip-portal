set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(11);

select has_function(
  'ggircs_portal_private', 'protect_read_only_products',
  'Function protect_read_only_products should exist'
);

insert into ggircs_portal.product(id, product_name, product_state, is_read_only) overriding system value
  values (1000, 'draft product', 'draft', false), (1001, 'published product', 'published', false), (1002, 'archived product', 'archived', true), (1003, 'read-only product', 'published', true);

-- Test trigger fires when it should
select throws_like(
  $$
    update ggircs_portal.product set product_name = 'changed published product' where id = 1001
  $$,
  'Product row is read only%',
  'trigger throws when trying to update a published product'
);

select results_eq(
  $$
    select product_name from ggircs_portal.product where id = 1001;
  $$,
  ARRAY['published product'::varchar(1000)],
  'published product name was not changed'
);

select throws_like(
  $$
    update ggircs_portal.product set product_name = 'changed archived product' where id = 1002
  $$,
  '%Product row is read-only%',
  'trigger throws when trying to update an archived product'
);

select results_eq(
  $$
    select product_name from ggircs_portal.product where id = 1002;
  $$,
  ARRAY['archived product'::varchar(1000)],
  'archived product name was not changed'
);

select throws_like(
  $$
    update ggircs_portal.product set product_state = 'draft' where id = 1001
  $$,
  '%cannot change back to draft state%',
  'trigger throws when trying to update the state of a published product back to draft'
);

select throws_like(
  $$
    update ggircs_portal.product set product_state = 'draft' where id = 1002
  $$,
  '%Product row is read-only%',
  'trigger throws when trying to update the state of an archived product back to published'
);

select throws_like(
  $$
    update ggircs_portal.product set product_name = 'cant change this' where id = 1003
  $$,
  '%Product row is read-only%',
  'trigger throws when trying to update a read-only product'
);

-- Test trigger doesn't run when it shouldn't
select lives_ok(
  $$
    update ggircs_portal.product set product_name='changed draft product' where id = 1000;
  $$,
  'trigger should allow changing products in draft state'
);

select results_eq(
  $$
    select product_name from ggircs_portal.product where id = 1000;
  $$,
  ARRAY['changed draft product'::varchar(1000)],
  'draft product name was changed'
);

select lives_ok(
  $$
    update ggircs_portal.product set product_state='archived' where id = 1001;
  $$,
  'trigger should allow changing a published product to archived'
);

select finish();

rollback;
