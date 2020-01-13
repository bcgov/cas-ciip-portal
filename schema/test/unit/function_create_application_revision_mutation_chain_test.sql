set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_function(
  'ggircs_portal', 'create_application_revision_mutation_chain', array['integer', 'integer'],
  'Function create_application_revision_mutation_chain should exist'
);

select finish();

rollback;
