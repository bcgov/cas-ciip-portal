-- Deploy ggircs-portal:table_benchmark to pg
-- requires: table_benchmark

BEGIN;

create table ggircs_portal.benchmark (
  id serial not null,
  product_id int not null references ggircs_portal.product(id),
  benchmark int not null,
  eligibility_threshold int not null,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  archived boolean DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(1000),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(1000)
);

create unique index benchmark_id_uindex
	on ggircs_portal.benchmark (id);

alter table ggircs_portal.benchmark
	add constraint benchmark_pk
		primary key (id);

comment on column ggircs_portal.benchmark.id is 'Unique ID for the benchmark';
comment on column ggircs_portal.benchmark.product_id is 'Foreign key to the product';
comment on column ggircs_portal.benchmark.benchmark is 'The value of the benchmark';
comment on column ggircs_portal.benchmark.eligibility_threshold is 'The value of eligibility_threshold';
comment on column ggircs_portal.benchmark.start_date is 'The date when this benchmark became/becomes active';
comment on column ggircs_portal.benchmark.end_date is 'The date when this benchmark became/becomes inactive';
comment on column ggircs_portal.benchmark.archived is 'Boolean indicating archived status';
comment on column ggircs_portal.benchmark.created_at is 'Creation date of row';
comment on column ggircs_portal.benchmark.created_by is 'Creator of row';
comment on column ggircs_portal.benchmark.updated_at is 'Update date of row';
comment on column ggircs_portal.benchmark.updated_by is 'Creator of row update';


COMMIT;
