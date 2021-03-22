-- Revert ggircs-portal:tables/fuel_naics_code from pg

begin;

drop table ggircs_portal.fuel_naics_code;

commit;
