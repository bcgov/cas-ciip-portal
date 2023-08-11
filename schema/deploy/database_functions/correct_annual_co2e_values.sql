-- Deploy ggircs-portal:database_functions/correct_annual_co2e_values to pg

/**
  Some applications during the 2023 reporting cycle (2022 reporting year) were created before the correct gwp
  values were applied, which means when the applications were initialized the old AR4 values were applied.
  This function updates the annual CO2e values in place to the correct AR5 values.
**/

begin;

create or replace function ggircs_portal_private.correct_annual_co2e_values()
returns void as $$

update ggircs_portal.form_result
set form_result = jsonb_set(
    form_result,
    '{sourceTypes}',
    (
      select jsonb_agg(
        jsonb_set(
          sourceType,
          '{gases}',
          (
            select jsonb_agg(
              jsonb_set(
                gas,
                '{annualCO2e}',
                ((gas->>'gwp')::numeric * (gas->>'annualEmission')::numeric)::text::jsonb
              )
            )from jsonb_array_elements(sourceType->'gases') gas
          )
        )
      ) from jsonb_array_elements(form_result->'sourceTypes') sourceType
    )
)
where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at > '2023-04-01'
  ) and form_id=2;

$$ language sql volatile;

commit;

