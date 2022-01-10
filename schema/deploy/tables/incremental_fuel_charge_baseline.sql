-- Deploy ggircs-portal:tables/incremental_incremental_fuel_charge_baseline_charge_baseline to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.incremental_fuel_charge_baseline (
  id integer primary key generated always as identity,
  carbon_tax_act_fuel_type_id int not null,
  start_reporting_period int references ggircs_portal.reporting_year(reporting_year) not null,
  end_reporting_period int references ggircs_portal.reporting_year(reporting_year),
  fuel_charge_baseline numeric not null,
  comment varchar(100000)
);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'incremental_fuel_charge_baseline',
  add_create := true,
  add_update := true,
  add_delete := true
);

create index fuel_charge_baseline_ct_act_fuel_type_fkey on ggircs_portal.incremental_fuel_charge_baseline(carbon_tax_act_fuel_type_id);
create index fuel_charge_baseline_start_year_fkey on ggircs_portal.incremental_fuel_charge_baseline(start_reporting_period);
create index fuel_charge_baseline_end_year_fkey on ggircs_portal.incremental_fuel_charge_baseline(end_reporting_period);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'incremental_fuel_charge_baseline', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'incremental_fuel_charge_baseline', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'incremental_fuel_charge_baseline', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'incremental_fuel_charge_baseline', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'incremental_fuel_charge_baseline', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.incremental_fuel_charge_baseline enable row level security;

comment on table ggircs_portal.incremental_fuel_charge_baseline is 'Table containing information on the baseline carbon tax charge for taxable fuel types. This baseline is used when calculating the incremental carbon tax that can be applied to an incentive payment';
comment on column ggircs_portal.incremental_fuel_charge_baseline.id is 'Unique ID for the incremental_fuel_charge_baseline table';
comment on column ggircs_portal.incremental_fuel_charge_baseline.carbon_tax_act_fuel_type_id is 'Foreign key to swrs.carbon_tax_act_fuel_type, not defined as a foreign key as the swrs schema is managed separately, and will eventually be either accessed via an API or a foreign data wrapper';
comment on column ggircs_portal.incremental_fuel_charge_baseline.start_reporting_period is 'The first reporting period for which the baseline charge is applicable';
comment on column ggircs_portal.incremental_fuel_charge_baseline.end_reporting_period is 'The last reporting period for which the baseline charge is applicable';
comment on column ggircs_portal.incremental_fuel_charge_baseline.fuel_charge_baseline is 'The baseline carbon tax charge for the taxable fuel type';
comment on column ggircs_portal.incremental_fuel_charge_baseline.comment is 'Comments on the baseline charge';
comment on column ggircs_portal.incremental_fuel_charge_baseline.created_at is 'Creation date of row';
comment on column ggircs_portal.incremental_fuel_charge_baseline.created_by is 'Creator of row';
comment on column ggircs_portal.incremental_fuel_charge_baseline.updated_at is 'Updated date of row';
comment on column ggircs_portal.incremental_fuel_charge_baseline.updated_by is 'Updator of row';
comment on column ggircs_portal.incremental_fuel_charge_baseline.deleted_at is 'Date of deletion';
comment on column ggircs_portal.incremental_fuel_charge_baseline.deleted_by is 'The user who deleted the row';

commit;
