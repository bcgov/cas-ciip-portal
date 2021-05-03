-- change form result data so that the 'Data has changed' errors will show up

begin;

  select test_helper.initialize_form_result_data(
      application_id := 1,
      version_number := 1,
      form_id := (select id from ggircs_portal.form_json where slug = 'admin-2020'),
      seed := 99);

commit;
