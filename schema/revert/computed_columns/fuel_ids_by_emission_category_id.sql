-- Revert ggircs-portal:computed_columns/fuel_ids_by_emission_category_id from pg

begin;

drop function ggircs_portal.fuel_ids_by_emission_category_id;

commit;
