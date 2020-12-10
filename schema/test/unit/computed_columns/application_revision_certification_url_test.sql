set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'application_revision_certification_url', array['ggircs_portal.application_revision'],
  'Function ggircs_portal.application_revision_certification_url should exist'
);

truncate ggircs_portal.application restart identity cascade;
truncate ggircs_portal.certification_url cascade;
alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

-- Set time where application is open, reporting year 2019
select mocks.set_mocked_time_in_transaction('2020-07-03 00:00:00.000000-07'::timestamptz);

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain(1);
insert into ggircs_portal.certification_url(application_id, version_number)
values (1,1);

select results_eq(
  $$
    with revision as (select row(ar.*)::ggircs_portal.application_revision from ggircs_portal.application_revision ar where application_id=1 and version_number=1)
    select pg_typeof(id) from ggircs_portal.application_revision_certification_url((select * from revision));
  $$,
  ARRAY['character varying'::regtype],
  'Computed column returns a certification url row when passed an application_revision'
);

select finish();

rollback;
