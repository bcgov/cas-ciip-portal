set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(5);

select has_function(
  'ggircs_portal', 'search_all_facilities', array['text', 'text', 'text', 'text', 'text', 'int', 'int', 'int'],
  'Function search_all_facilities should exist'
);

set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

-- Set time where application is open, reporting year 2019
select mocks.set_mocked_time_in_transaction('2020-07-03 00:00:00.000000-07'::timestamptz);

select is(
  (select count(*) from ggircs_portal.search_all_facilities(null, null, 'id', 'asc', null, 0, 10000, 2019)),
  (select count(*) from ggircs_portal.facility f
    join ggircs_portal.ciip_user_organisation cuo on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu on cuo.user_id = cu.id
    and cu.uuid = '00000000-0000-0000-0000-000000000000'::uuid),
  'The search_all_facilities function should return all the facilities attached to organisations the user has access to if there is organisaion_row_id is null');

select is(
  (select count(*) from ggircs_portal.search_all_facilities(null, null, 'id', 'asc', '8', 0, 10000, 2019)),
  (select count(*) from ggircs_portal.facility f
    join ggircs_portal.ciip_user_organisation cuo on f.organisation_id = cuo.organisation_id
    and f.organisation_id = 8
    join ggircs_portal.ciip_user cu on cuo.user_id = cu.id
    and cu.uuid = '00000000-0000-0000-0000-000000000000'::uuid),
  'The search_all_facilities function should return only the facilities attached to organisation id=8 if there is organisaion_row_id is 8 (and the user has access to that organisation)');

select id, organisation_id from ggircs_portal.facility;
select * from ggircs_portal.application;

select results_eq(
  $$
    select application_revision_status from ggircs_portal.search_all_facilities(null, null, 'id', 'asc', '8', 0, 10000, 2019)
  $$,
  ARRAY['submitted'::ggircs_portal.ciip_application_revision_status],
  'The application revision status is submitted when there is a submitted application in 2019 and 2019 is passed as a search parameter'
);

update ggircs_portal.application set reporting_year=2018 where id=1;

select results_eq(
  $$
    select application_revision_status from ggircs_portal.search_all_facilities(null, null, 'id', 'asc', '8', 0, 10000, 2019)
  $$,
  ARRAY[null::ggircs_portal.ciip_application_revision_status],
  'The application revision status is null when there is a submitted application in 2018, but not 2019 and 2019 is passed as a search parameter'
);

select finish();

rollback;
