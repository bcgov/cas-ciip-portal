-- Deploy ggircs-portal:table_benchmark to pg
-- requires: table_benchmark

BEGIN;

create table ggircs_portal.benchmark (
  id serial not null,
  product_id int not null references ggircs_portal.product(id),
  benchmark int not null,
  eligibility_threshold int not null,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create unique index benchmark_id_uindex
	on ggircs_portal.benchmark (id);

alter table ggircs_portal.benchmark
	add constraint benchmark_pk
		primary key (id);

comment on column ggircs_portal.benchmark.id is 'Unique ID for the benchmark';
comment on column ggircs_portal.benchmark.benchmark is 'The value of the benchmark';
comment on column ggircs_portal.benchmark.eligibility_threshold is 'The value of eligibility_threshold';
comment on column ggircs_portal.benchmark.created_at is 'Creation date of row';


COMMIT;
