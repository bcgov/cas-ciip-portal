-- Revert ggircs-portal:mutations/create_fuel_naics_code from pg

begin;

drop function ggircs_portal.create_fuel_naics_code;

commit;
