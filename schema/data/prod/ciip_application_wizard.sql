begin;

truncate table ggircs_portal.ciip_application_wizard;

with rows as (
insert into ggircs_portal.ciip_application_wizard
  (form_id, form_position)
values
  ((select id from ggircs_portal.form_json where slug='admin-2020'), 0),
  ((select id from ggircs_portal.form_json where slug='emission'), 1),
  ((select id from ggircs_portal.form_json where slug='fuel'), 2),
  ((select id from ggircs_portal.form_json where slug='production'), 3)
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.ciip_application_wizard' from rows;

commit;
