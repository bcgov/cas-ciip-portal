-- change form result data so that the 'Data has changed' errors will show up

begin;

  select test_helper.initialize_form_result_data(2,1,1);

commit;
