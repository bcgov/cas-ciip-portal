-- Deploy ggircs-portal:table_benchmark to pg
-- requires: table_benchmark

begin;

create table ggircs_portal.benchmark (
  id integer primary key generated always as identity,
  product_id int not null references ggircs_portal.product(id),
  benchmark real not null,
  eligibility_threshold real not null,
  incentive_multiplier real not null default 1,
  excludes_exported_energy boolean not null default true,
  start_reporting_year integer not null references ggircs_portal.reporting_year(reporting_year),
  end_reporting_year integer not null references ggircs_portal.reporting_year(reporting_year),
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.benchmark
  for each row
  execute procedure ggircs_portal.update_timestamps();

grant all on table ggircs_portal.benchmark to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on table ggircs_portal.benchmark is 'Table containing the benchmark and eligibility threshold for a product';
comment on column ggircs_portal.benchmark.id is 'Unique ID for the benchmark';
comment on column ggircs_portal.benchmark.product_id is 'Foreign key to the product';
comment on column ggircs_portal.benchmark.benchmark is 'The benchmark for a product, i.e. the emission intensity that would return a 100% incentive';
comment on column ggircs_portal.benchmark.eligibility_threshold is 'The eligibility threshold for a product, i.e. the maximum emission intensity (exclusive) allowed to get an incentive';
comment on column ggircs_portal.benchmark.incentive_multiplier is 'The multiplier applied to the incentive amounts under this product';
comment on column ggircs_portal.benchmark.excludes_exported_energy is 'Whether the emissions from exported energy were excluded in the benchmark calculation';
comment on column ggircs_portal.benchmark.start_reporting_year is 'The reporting year where this benchmark becomes active';
comment on column ggircs_portal.benchmark.end_reporting_year is 'The last reporting year where this benchmark is active';
comment on column ggircs_portal.benchmark.created_at is 'Creation date of row';
comment on column ggircs_portal.benchmark.created_by is 'Creator of row';
comment on column ggircs_portal.benchmark.updated_at is 'Last update date of row';
comment on column ggircs_portal.benchmark.updated_by is 'The user who last updated the row';
comment on column ggircs_portal.benchmark.deleted_at is 'Deletion date of row';
comment on column ggircs_portal.benchmark.deleted_by is 'The user who deleted the row';

commit;
