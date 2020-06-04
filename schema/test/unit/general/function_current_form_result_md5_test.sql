set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);


select has_function(
  'ggircs_portal_private', 'current_form_results_md5',
  'Function current_form_results_md5 should exist'
);

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;
truncate ggircs_portal.application cascade;

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain(1);

select lives_ok(
  $$
    select ggircs_portal_private.current_form_results_md5(1,1);
  $$,
  'function current_form_results_md5 runs without error'
);

select results_eq(
  $$
    select pg_typeof(ggircs_portal_private.current_form_results_md5(1,1));
  $$,
  ARRAY['bytea'::regtype],
  'function current_form_results_md5 returns an md5 hash of all the form results in bytea format'
);

select finish();

rollback;
