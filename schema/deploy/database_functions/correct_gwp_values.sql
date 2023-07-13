-- Deploy ggircs-portal:database_functions/correct_gwp_values to pg

/**
  Some applications during the 2023 reporting cycle (2022 reporting year) were created before the correct gwp
  values were applied, which means when the applications were initialized the old AR4 values were applied.
  This function updates the gwp values in place to the correct AR5 values.
**/

begin;

create or replace function ggircs_portal_private.correct_gwp_values()
returns void as $$

  -- CH4
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 25', '"gwp": 28')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;
-- N2O
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 298', '"gwp": 265')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;
-- SF6
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 22800', '"gwp": 23500')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;
-- CF4
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 7390', '"gwp": 6630')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;
-- C2F6
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 12200', '"gwp": 11100')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;
-- CH2F2
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 675', '"gwp": 677')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;
-- CH2HF5
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 3500', '"gwp": 3170')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;
-- C2H2F4
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 1430', '"gwp": 1300')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;

$$ language sql volatile;

commit;
