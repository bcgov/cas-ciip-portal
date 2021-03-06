
begin;

create temporary table administration (json_data jsonb);
\copy administration(json_data) from program 'sed ''s/\\/\\\\/g'' < prod/form_json/administration.json | tr -d ''\n''';

create temporary table emission (json_data jsonb);
\copy emission(json_data) from program 'sed ''s/\\/\\\\/g'' < prod/form_json/emission.json | tr -d ''\n''';

create temporary table fuel (json_data jsonb);
\copy fuel(json_data) from program 'sed ''s/\\/\\\\/g'' < prod/form_json/fuel.json | tr -d ''\n''';

create temporary table production (json_data jsonb);
\copy production(json_data) from program 'sed ''s/\\/\\\\/g'' < prod/form_json/production.json | tr -d ''\n''';

with rows as (
insert into ggircs_portal.form_json
  (id, name, slug, short_name, description, form_json, prepopulate_from_swrs, prepopulate_from_ciip, form_result_init_function)
  overriding system value
values
  (1,
  'Administration Data', 'admin', 'Admin data', 'Admin description',
  (select json_data from administration), true, true, 'init_application_administration_form_result'),
  (2, 'Emission', 'emission', 'Emission', 'Emission description',
  (select json_data from emission), true, false, 'init_application_emission_form_result'),
  (3, 'Fuel','fuel', 'Fuel', 'Fuel description',
  (select json_data from fuel), true, false, 'init_application_fuel_form_result'),
  (4, 'Production', 'production', 'Production', 'Production description',
  (select json_data from production), false, false, null)
on conflict(id) do update
set name=excluded.name, form_json=excluded.form_json,
    prepopulate_from_ciip=excluded.prepopulate_from_ciip,
    prepopulate_from_swrs=excluded.prepopulate_from_swrs,
    slug=excluded.slug,
    short_name=excluded.short_name,
    description=excluded.description
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.form_json' from rows;

select setval from
setval('ggircs_portal.form_json_id_seq', (select max(id) from ggircs_portal.form_json), true)
where setval = 0;

commit;
