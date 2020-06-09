set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(3);

select has_function(
  'ggircs_portal', 'search_all_facilities', array['text', 'text', 'text', 'text', 'text', 'int', 'int'],
  'Function search_all_facilities should exist'
);

set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

select is(
  (select count(*) from ggircs_portal.search_all_facilities(null, null, 'id', 'asc', null, 0, 10000)),
  (select count(*) from ggircs_portal.facility f
    join ggircs_portal.ciip_user_organisation cuo on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu on cuo.user_id = cu.id
    and cu.uuid = '00000000-0000-0000-0000-000000000000'::uuid),
  'The search_all_facilities function should return all the facilities attached to organisations the user has access to if there is organisaion_row_id is null');

select is(
  (select count(*) from ggircs_portal.search_all_facilities(null, null, 'id', 'asc', '8', 0, 10000)),
  (select count(*) from ggircs_portal.facility f
    join ggircs_portal.ciip_user_organisation cuo on f.organisation_id = cuo.organisation_id
    and f.organisation_id = 8
    join ggircs_portal.ciip_user cu on cuo.user_id = cu.id
    and cu.uuid = '00000000-0000-0000-0000-000000000000'::uuid),
  'The search_all_facilities function should return only the facilities attached to organisation id=8 if there is organisaion_row_id is 8 (and the user has access to that organisation)');

select finish();

rollback;
