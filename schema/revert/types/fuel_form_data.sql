-- Revert ggircs-portal:types/fuel_form_data from pg

begin;

drop type ggircs_portal.fuel_form_data;

commit;
