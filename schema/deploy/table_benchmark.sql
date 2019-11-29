-- Deploy ggircs-portal:table_benchmark to pg
-- requires: table_benchmark

begin;

create table ggircs_portal.benchmark (
  id integer primary key generated always as identity,
  product_id int not null references ggircs_portal.product(id),
  benchmark int not null,
  eligibility_threshold int not null,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.benchmark
  for each row
  execute procedure ggircs_portal.update_timestamps();

comment on table ggircs_portal.benchmark is 'Table containing the benchmark and eligibility threshold for a product';
comment on column ggircs_portal.benchmark.id is 'Unique ID for the benchmark';
comment on column ggircs_portal.benchmark.product_id is 'Foreign key to the product';
comment on column ggircs_portal.benchmark.benchmark is 'The value of the benchmark';
comment on column ggircs_portal.benchmark.eligibility_threshold is 'The value of eligibility_threshold';
comment on column ggircs_portal.benchmark.start_date is 'The date when this benchmark became/becomes active';
comment on column ggircs_portal.benchmark.end_date is 'The date when this benchmark became/becomes inactive';
comment on column ggircs_portal.benchmark.created_at is 'Creation date of row';
comment on column ggircs_portal.benchmark.created_by is 'Creator of row';
comment on column ggircs_portal.benchmark.updated_at is 'Last update date of row';
comment on column ggircs_portal.benchmark.updated_by is 'The user who last updated the row';
comment on column ggircs_portal.benchmark.deleted_at is 'Deletion date of row';
comment on column ggircs_portal.benchmark.deleted_by is 'The user who deleted the row';

commit;
