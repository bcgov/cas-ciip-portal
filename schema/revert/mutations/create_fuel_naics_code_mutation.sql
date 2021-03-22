-- Revert ggircs-portal:mutations/create_fuel_naics_code_mutation from pg

begin;

drop function ggircs_portal.create_fuel_naics_code_mutation;

commit;
