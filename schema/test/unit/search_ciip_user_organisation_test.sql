set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(2);

select has_function(
  'ggircs_portal', 'search_ciip_user_organisation',
  'Function search_ciip_user_organisation should exist'
);

-- drop the trigger that adds the user id based on session & add values to the ciip_user_organisation table for testing
-- TODO: find a way to mock the session in tests
drop trigger _set_user_id on ggircs_portal.ciip_user_organisation;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values(1, 1, 'approved');

select set_eq(
  ($$select id, user_id, organisation_id from ggircs_portal.search_ciip_user_organisation(null, null, 'status', 'ASC')$$),
  ('select id, user_id, organisation_id from ggircs_portal.ciip_user_organisation'),
  'The search_user_organisation function returns values for all columns that are required by the user_organisation type');

select finish();

rollback;
