-- Revert ggircs-portal:tables/incremental_fuel_charge_baseline from pg

begin;

drop table ggircs_portal.incremental_fuel_charge_baseline;

commit;
