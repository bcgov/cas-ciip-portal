set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'get_swrs_operator_contact_data', array['integer', 'integer'],
  'Function get_swrs_operator_contact_data should exist'
);

select is(
  (select report_id from ggircs_portal.get_swrs_operator_contact_data(45944, 2015)),
  1,
  'The get_swrs_operator_contact_data function should return a value');

select finish();

rollback;
