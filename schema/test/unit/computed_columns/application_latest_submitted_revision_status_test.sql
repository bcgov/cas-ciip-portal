begin;
set client_min_messages to warning;
create extension if not exists pgtap;

select plan(3);
truncate ggircs_portal.application restart identity cascade;
select test_helper.modify_triggers('disable');
reset client_min_messages;
select test_helper.mock_open_window(2019);
select ggircs_portal.create_application_mutation_chain(1);

select is(
 (
  select * from ggircs_portal.application_latest_submitted_revision_status((select row(application.*)::ggircs_portal.application from ggircs_portal.application where id = 1))
 ),
  null,
  'The latest submitted revision status should be null if the application was not submitted'
);

insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values (1, 1, 'submitted');

select is(
 (
  select * from ggircs_portal.application_latest_submitted_revision_status((select row(application.*)::ggircs_portal.application from ggircs_portal.application where id = 1))
 ),
  'submitted',
  'The latest submitted revision status should be "submitted" if the application was submitted'
);

select ggircs_portal.create_application_revision_mutation_chain(1,1);

select is(
 (
  select * from ggircs_portal.application_latest_submitted_revision_status((select row(application.*)::ggircs_portal.application from ggircs_portal.application where id = 1))
 ),
  'submitted',
  'The latest submitted revision status should remain "submitted" if a new application revision was started'
);

rollback;
