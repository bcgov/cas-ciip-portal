-- Revert ggircs-portal:tables/fuel_emission_category from pg

begin;

drop table ggircs_portal.fuel_emission_category;

commit;
