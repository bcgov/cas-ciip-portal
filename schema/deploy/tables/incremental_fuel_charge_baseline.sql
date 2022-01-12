-- Deploy ggircs-portal:tables/incremental_incremental_fuel_charge_baseline_charge_baseline to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.incremental_fuel_charge_baseline (
  id integer primary key generated always as identity,
  carbon_tax_act_fuel_type_id int not null,
  start_reporting_period int not null,
  end_reporting_period int not null,
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

-- Add the 2021 baseline data
insert into ggircs_portal.incremental_fuel_charge_baseline(
  carbon_tax_act_fuel_type_id,
  start_reporting_period,
  end_reporting_period,
  fuel_charge_baseline,
  comment
) values
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Aviation Fuel'), 2021, 9999, 0.0747, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Gasoline'), 2021, 9999, 0.0663, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Heavy Fuel Oil'), 2021, 9999, 0.0956, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Jet Fuel'), 2021, 9999, 0.0775, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Kerosene'), 2021, 9999, 0.0775, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Light Fuel Oil'), 2021, 9999, 0.0781,
      $$ The $30/tonne rate for Light Fuel Oil is different from the federal rate because the feds reduce their full rate by 2% instead of the BC rate of 5%. Both reductions are to account for renewable fuel requirements.
         To derive the light fuel oil rate we have multiplied the BC rate of $50/tonne rate by .6 and rounded to four decimal places as per the practice with rounding in the CTA.
      $$
    ),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Methanol'), 2021, 9999, 0.0329, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Naphtha'), 2021, 9999, 0.0676, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Butane'), 2021, 9999, 0.0534, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Coke Oven Gas'), 2021, 9999, 0.021, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Ethane'), 2021, 9999, 0.0306, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Propane'), 2021, 9999, 0.0464, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Natural Gas'), 2021, 9999, 0.0587, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Refinery Gas'), 2021, 9999, 0.081, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'High Heat Value Coal'), 2021, 9999, 67.55, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Low Heat Value Coal'), 2021, 9999, 53.17, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Coke'), 2021, 9999, 95.39, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Petroleum Coke'), 2021, 9999, 0.1151, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Gas Liquids'), 2021, 9999, 0.0499, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Pentanes Plus'), 2021, 9999, 0.0534, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Peat'), 2021, 9999, 30.66, 'There is no federal rate for peat, so this is the $30/tonne rate for BC.'),
    /*
      The rate for "Tires - Shredded" and "Tires - Whole" below is the federal rate for 'Combustible Waste'.
      Shredded / Whole tires have been merged into Combustible Waste as of 2021-04-01 and now share the same rate.
      They have different historical rates, so we will need to continue to treat them individually to preserve that historical difference.
    */
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Tires - Shredded'), 2021, 9999, 59.92, null),
    ((select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Tires - Whole'), 2021, 9999, 59.92, null);

commit;
