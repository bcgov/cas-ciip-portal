set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);


select has_function(
  'ggircs_portal_private', 'current_form_results_md5',
  'Function current_form_results_md5 should exist'
);

truncate ggircs_portal.application cascade;

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility

select lives_ok(
  $$
    select ggircs_portal_private.current_form_results_md5(1,1);
  $$,
  'function current_form_results_md5 runs without error'
);

select results_eq(
  $$
    select ggircs_portal_private.current_form_results_md5(1,1);
  $$,
  ARRAY['bytea'],
  'function current_form_results_md5 returns an md5 hash of all the form results in bytea format'
)

select finish();

rollback;
