set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(2);

select has_view('ggircs_portal', 'ciip_production', 'There is a ciip_production view');

select is(
  (select count(*) from ggircs_portal.ciip_production where application_id = 1)::integer, 2,
  'The ciip_production view returns the correct count of products'
);

select finish();

rollback;
