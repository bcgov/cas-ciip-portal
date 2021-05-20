begin;

with rows as (
insert into ggircs_portal.ciip_application_wizard
  (form_id, form_position, is_active)
values
  ((select id from ggircs_portal.form_json where slug='admin-2020'), 0, true),
  ((select id from ggircs_portal.form_json where slug='emission'), 1, true),
  ((select id from ggircs_portal.form_json where slug='fuel'), 2, true),
  ((select id from ggircs_portal.form_json where slug='production'), 3, true),
  ((select id from ggircs_portal.form_json where slug='admin'), 0, false)
on conflict(form_id) do update set form_position=excluded.form_position, is_active=excluded.is_active
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.ciip_application_wizard' from rows;

commit;
