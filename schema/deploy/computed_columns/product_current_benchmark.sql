-- Deploy ggircs-portal:computed_columns/product_current_benchmark to pg
-- requires: tables/benchmark

begin;

create or replace function ggircs_portal.product_current_benchmark(prod ggircs_portal.product)
  returns numeric
  as $$
    select benchmark from ggircs_portal.benchmark b
    where b.product_id = prod.id
    order by b.id desc limit 1;
  $$ language sql stable;

comment on function ggircs_portal.product_current_benchmark(ggircs_portal.product) is E'@sortable\nComputed column returns the current benchmark value for the product passed in via function parameter';

commit;
