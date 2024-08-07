-- Deploy ggircs-portal:tables/incremental_fuel_charge_baseline_001 to pg
-- requires: tables/incremental_fuel_charge_baseline

begin;

-- 1 Aviation Fuel
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.07464
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Aviation Fuel');

-- 2 Gasoline: No update to value

-- 3 Heavy Fuel Oil
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.09558
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Heavy Fuel Oil');

-- 4 Jet Fuel
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.07746
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Jet Fuel');

-- 5 Kerosene
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.07746
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Kerosene');

-- 6 Light Fuel Oil
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.07806
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Light Fuel Oil');

-- 7 Methanol: No update to Methanol

-- 8 Naphtha
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.06762
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Naphtha');

-- 9 Butane: No update to Butane

-- 10 Coke Oven gas: No update to Coke Oven Gas

-- 11 Ethane
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.03054
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Ethane');

-- 12 Propane
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.04644
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Propane');

-- 13 Natural Gas
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.05874
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Natural Gas');

-- 14 Refinery Gas: No update to Refinery Gas

-- 15 HHV Coal
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 67.548
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'High Heat Value Coal');

-- 16 LHV Coal
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 53.172
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Low Heat Value Coal');

-- 17 Coke
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 95.394
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Coke');

-- 18 Petroleum Coke
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.11514
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Petroleum Coke');

-- 19 Gas Liquids
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 0.04992
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Gas Liquids');

-- 20 Pentanes Plus: No update to Pentanes Plus

-- 21 Peat: No update to Peat

/*
  The rate for "Tires - Shredded" and "Tires - Whole" below is the federal rate for 'Combustible Waste'.
  Shredded / Whole tires have been merged into Combustible Waste as of 2021-04-01 and now share the same rate.
  They have different historical rates, so we will need to continue to treat them individually to preserve that historical difference.
*/

-- 22 Tires - Shredded
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 59.922
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Tires - Shredded');

-- 23 Tires - Whole
update ggircs_portal.incremental_fuel_charge_baseline set fuel_charge_baseline = 59.922
where carbon_tax_act_fuel_type_id = (select id from swrs.carbon_tax_act_fuel_type where carbon_tax_fuel_type = 'Tires - Whole');

commit;
