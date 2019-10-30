begin;

with rows as (
insert into ggircs_portal.ciip_application_wizard
  (form_id, form_position, prepopulate_from_ciip, prepopulate_from_swrs)
values
  (1, 0, true, true),
  (2, 1, false, true),
  (3, 2, false, true),
  (4, 3, false, false),
  (5, 4, false, false),
  (6, 5, false, false)
on conflict(form_id) do update
set
  form_position=excluded.form_position,
  prepopulate_from_ciip=excluded.prepopulate_from_ciip,
  prepopulate_from_swrs=excluded.prepopulate_from_swrs
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.ciip_application_wizard' from rows;

commit;
