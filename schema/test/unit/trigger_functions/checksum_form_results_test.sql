set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

select has_function(
  'ggircs_portal', 'checksum_form_results',
  'Function checksum_form_results should exist'
);

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

-- Insert organisation & facility test data
insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'test facility');

-- Set the timesamp to a time where the application window is open
create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

-- Test default status
select results_eq(
  $$
    select form_result_status
      from ggircs_portal.form_result_status
      where application_id = (select max(id) from ggircs_portal.application)
      and form_id = 1;
  $$,
  ARRAY['in review'::ggircs_portal.ciip_form_result_status],
  'form_result status should default to in review'
);

insert into ggircs_portal.certification_url(application_id, version_number, certification_signature)
values ((select max(id) from ggircs_portal.application), 1, 'signed');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
values ((select max(id) from ggircs_portal.application), 1, 'submitted');


-- Test trigger doesn't run when it shouldn't
select results_eq(
  $$
    select form_result_status
      from ggircs_portal.form_result_status
      where application_id = (select max(id) from ggircs_portal.application)
      and form_id = 1;
  $$,
  ARRAY['in review'::ggircs_portal.ciip_form_result_status],
  'trigger should not change the form result status if there is no difference in the form result'
);

-- Call create_application_revision_mutation_chain to create a revision
select ggircs_portal.create_application_revision_mutation_chain((select max(id) from ggircs_portal.application), 1);

-- Change form_result of new version to activate trigger on update of status
update ggircs_portal.form_result
  set form_result = '{"TEST":"test"}'
  where application_id = (select max(id) from ggircs_portal.application)
  and version_number = 2;

-- Activate trigger by updating status
insert into ggircs_portal.certification_url(application_id, version_number, certification_signature)
values ((select max(id) from ggircs_portal.application), 2, 'signed');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
values ((select max(id) from ggircs_portal.application), 2, 'submitted');


-- Test trigger
select results_eq(
  $$
    select form_result_status
      from ggircs_portal.form_result_status
      where application_id = (select max(id) from ggircs_portal.application)
      and form_id = 1;
  $$,
  ARRAY['needs attention'::ggircs_portal.ciip_form_result_status],
  'checksum_form_results trigger changes status to "needs attention" if form_result has changed'
);

select finish();

rollback;
