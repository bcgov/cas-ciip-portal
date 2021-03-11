-- Revert ggircs-portal:computed_columns/product_current_benchmark from pg

begin;

drop function ggircs_portal.product_current_benchmark;

commit;
