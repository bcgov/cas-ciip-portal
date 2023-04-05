-- Deploy ggircs-portal:computed_columns/fuel_ids_by_emission_category_id to pg

create or replace function ggircs_portal.fuel_ids_by_emission_category_id()
  returns table(emission_category_id int, fuel_ids int[])
  as $$
    select emission_category_id, array_agg(fuel_id) from ggircs_portal.fuel_emission_category group by emission_category_id;
  $$ language sql stable;

comment on function ggircs_portal.fuel_ids_by_emission_category_id() is 'Computed column that returns a list of emission category ids and a list of its corresponding fuel_ids';
