set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

select has_function(
  'ggircs_portal', 'create_application_mutation_chain', array['integer'],
  'Function create_application_mutation_chain should exist'
);

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

truncate table ggircs_portal.organisation restart identity cascade;
insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name, report_id) values (1, 'test facility', 42);

-- Set the timestamp to a time where the application window is open
-- 2020 open date
select mocks.set_mocked_time_in_transaction('2021-04-01 14:49:54.191757-07'::timestamptz);


select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

select is(
  (select report_id from ggircs_portal.application where id = 1), 42::integer,
  'create_application_mutation_chain copies the report_id from the facility table to the application table'
);

select is(
  (select form_result from ggircs_portal.form_result where application_id=1 and version_number=1 and form_id=1),
  (select default_form_result from ggircs_portal.form_json where id=1),
  'The initial empty form_result is derived from the form_json.default_form_result column'
);

-- Set the timestamp to a time where the application window is closed
-- 2020 open date minus one second
select mocks.set_mocked_time_in_transaction('2021-04-01 14:49:54.191757-07'::timestamptz - interval '1 second');


select throws_ok(
  'select ggircs_portal.create_application_mutation_chain(1)',
  'The application window is closed',
  'create_application_mutation_chain should throw an exception if the application window is closed'
);

select finish();

rollback;
