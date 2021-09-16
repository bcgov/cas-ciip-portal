set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_function(
  'ggircs_portal_private', 'restrict_old_application_submission',
  'Function restrict_old_application_submission should exist'
);

select finish();

rollback;
