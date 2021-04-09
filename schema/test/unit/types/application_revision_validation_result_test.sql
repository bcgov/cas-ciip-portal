set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_type(
  'ggircs_portal', 'application_revision_validation_result', 'Type application_revision_validation_result should exist'
);

select finish();

rollback;
