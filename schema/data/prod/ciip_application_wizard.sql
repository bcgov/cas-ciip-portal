begin;

with rows as (
insert into ggircs_portal.ciip_application_wizard
  (form_id, form_position)
values
  (1, 0),
  (2, 1),
  (3, 2),
  (4, 3)
on conflict(form_id) do update
set
  form_position=excluded.form_position
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.ciip_application_wizard' from rows;

commit;
