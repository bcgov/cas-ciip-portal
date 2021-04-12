set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

select has_function(
  'ggircs_portal', 'application_revision_validation', array['ggircs_portal.application_revision'],
  'Function application_revision_validation should exist'
);

-- Test setup
create or replace function ggircs_portal.falsy(id int)
  returns boolean as
  $func$
    begin
      return false;
    end;
  $func$
language 'plpgsql' stable;

create or replace function ggircs_portal.truthy(id int)
  returns boolean as
  $function$
    begin
      return true;
    end;
  $function$
language 'plpgsql' stable;

select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
alter table ggircs_portal.application disable trigger _send_draft_application_email;
select test_helper.create_test_users();
select test_helper.mock_open_window();
select test_helper.create_applications(1, True, True);

insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message)
values
('falsy', 'this is always false', 'failed'),
('truthy', 'this is always true', 'passed');

-- Call function
with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where applicationId=1 and versionNumber=1)
      select * from ggircs_portal.application_revision_validation((select * from record)) order by is_ok desc limit 1;

select results_eq(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where applicationId=1 and versionNumber=1)
      select count(*) from ggircs_portal.application_revision_validation((select * from record))
  $$,
  $$
    (select count(*) from ggircs_portal.application_revision_validation_function)
  $$,
  'Function returns a row for every function listed in the application_revision_validation_function table'
);

select results_eq(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where applicationId=1 and versionNumber=1)
      select validation_description, validation_failed_message, is_ok from ggircs_portal.application_revision_validation((select * from record)) order by is_ok asc limit 1
  $$,
  $$
    VALUES ('this is always false'::varchar, 'failed'::varchar, 'false'::boolean)
  $$,
  'Function returns the correct values from the falsy function'
);

select results_eq(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where applicationId=1 and versionNumber=1)
      select validation_description, validation_failed_message, is_ok from ggircs_portal.application_revision_validation((select * from record)) order by is_ok desc limit 1
  $$,
  $$
    VALUES ('this is always true'::varchar, 'passed'::varchar, 'true'::boolean)
  $$,
  'Function returns the correct values from the truthy function'
);

select finish();
rollback;
