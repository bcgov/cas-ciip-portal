-- Revert ggircs-portal:tables/fuel_naics from pg

begin;

drop table ggircs_portal.fuel_naics;

commit;
