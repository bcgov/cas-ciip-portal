-- Deploy ggircs-portal:table_product_benchmark to pg
-- requires: schema_ggircs_portal

BEGIN;

create table ggircs_portal.product_benchmark (
  id serial not null,
  product_id int,
  benchmark_id int
);

create unique index product_benchmark_id_uindex
	on ggircs_portal.product_benchmark (id);

alter table ggircs_portal.product_benchmark
	add constraint product_benchmark_pk
		primary key (id);

comment on column ggircs_portal.product_benchmark.id is 'Unique ID for the product_benchmark through table';
comment on column ggircs_portal.product_benchmark.product_id is 'The product id';
comment on column ggircs_portal.product_benchmark.benchmark_id is 'The benchmark id';

COMMIT;
