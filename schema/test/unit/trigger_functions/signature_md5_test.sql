set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(6);

select has_function(
  'ggircs_portal_private', 'signature_md5',
  'Function signature_md5 should exist'
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

truncate ggircs_portal.application cascade;

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

insert into ggircs_portal.certification_url(application_id, version_number)
values
((select max(id) from ggircs_portal.application), 1);

-- update ggircs_portal.application_revision_status
--   set application_revision_status = 'submitted'
--   where application_id = (select max(id) from ggircs_portal.application)
--   and version_number = 1;

select isnt_empty(
  $$
    select form_results_md5 from ggircs_portal.certification_url where id = (select max(id) from ggircs_portal.certification_url);
  $$,
  'trigger should set form_result_md5 on creation'
);

-- Trigger doesn't throw when it shouldn't (user can sign if form_results_md5 = current hash)
select lives_ok(
  $$
    update ggircs_portal.certification_url set certification_signature = 'signed' where id = (select max(id) from ggircs_portal.certification_url);
  $$,
  'trigger should not throw an exception if the form_result_md5 matches the current form result hash'
);

select certification_signature from ggircs_portal.certification_url where id = (select max(id) from ggircs_portal.certification_url);

-- Trigger doesn't throw when it shouldn't (user can submit if form_results_md5 = current hash and signature exists)
select lives_ok(
  $$
    insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
    values
    ((select max(id) from ggircs_portal.application), 1, 'submitted');

  $$,
  'trigger should not throw an exception if the form_result_md5 matches the current form result hash and a signature exists'
);

-- drop all previous data & start clean for testing THROWS EXCEPTION
truncate ggircs_portal.application cascade;
-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

insert into ggircs_portal.certification_url(application_id, version_number)
values
((select max(id) from ggircs_portal.application), 1);

insert into ggircs_portal.certification_url(application_id, version_number)
values
((select max(id) from ggircs_portal.application), 1);
-- change form_results_md5 so the trigger function should throw
update ggircs_portal.certification_url set form_results_md5='abc' where id = (select max(id) from ggircs_portal.certification_url);
update ggircs_portal.application_revision_status set application_revision_status = 'draft' where id = (select max(id) from ggircs_portal.application_revision_status);

-- Trigger throws when it should (user cannot sign if form_results_md5 != current hash)
select throws_like(
  $$
    update ggircs_portal.certification_url set certification_signature = 'signed' where id = (select max(id) from ggircs_portal.certification_url);
  $$,
  'current hash%',
  'trigger should throw an exception if the form_result_md5 does not match the current form result hash when signing'
);

-- Trigger throws when it should (user cannot sign if form_results_md5 != current hash)
select throws_like(
  $$
    insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
    values
    ((select max(id) from ggircs_portal.application), 1, 'submitted');
  $$,
  '%has not been signed by a certifier',
  'trigger should throw an exception if the form_result_md5 does not match the current form result hash when submitting the application'
);

select finish();

rollback;
