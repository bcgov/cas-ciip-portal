-- Revert ggircs-portal:data/correct_gwp_values from pg

begin;

alter table ggircs_portal.form_result disable trigger _100_timestamps, disable trigger _immutable_form_result;

  -- CH4
update ggircs_portal.form_result
  set form_result = replace(form_result::text, '"gwp": 28', '"gwp": 25')::jsonb
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
  set form_result = replace(form_result::text, '"gwp": 265', '"gwp": 298')::jsonb
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
  set form_result = replace(form_result::text, '"gwp": 23500', '"gwp": 22800')::jsonb
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
  set form_result = replace(form_result::text, '"gwp": 6630', '"gwp": 7390')::jsonb
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
  set form_result = replace(form_result::text, '"gwp": 11100', '"gwp": 12200')::jsonb
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
  set form_result = replace(form_result::text, '"gwp": 677', '"gwp": 675')::jsonb
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
  set form_result = replace(form_result::text, '"gwp": 3170', '"gwp": 3500')::jsonb
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
  set form_result = replace(form_result::text, '"gwp": 1300', '"gwp": 1430')::jsonb
  where application_id in (
    select application_id
      from ggircs_portal.application_revision ar
      join ggircs_portal.application a
      on a.id = ar.application_id
      and a.reporting_year = 2022
      and ar.created_at < '2023-05-30' and ar.created_at > '2023-04-01'
  )
  and form_id=2;

alter table ggircs_portal.form_result enable trigger _100_timestamps, enable trigger _immutable_form_result;

commit;
