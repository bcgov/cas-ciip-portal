set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_function(
  'ggircs_portal_private', 'checksum_form_results',
  'Function checksum_form_results should exist'
);

select finish();

rollback;
