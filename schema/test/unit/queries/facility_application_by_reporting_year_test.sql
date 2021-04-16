set client_min_messages to warning;
create extension if not exists pgtap;

begin;

select plan(4);

truncate table ggircs_portal.application restart identity cascade;
alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

-- create one applicationin 2018, two in 2019, and three in 2020
select test_helper.mock_open_window(2018);
select ggircs_portal.create_application_mutation_chain(1);

select test_helper.mock_open_window(2019);
select ggircs_portal.create_application_mutation_chain(2);
select ggircs_portal.create_application_mutation_chain(3);

select test_helper.mock_open_window(2020);
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
select ggircs_portal.create_application_mutation_chain(3);

select has_function(
  'ggircs_portal', 'facility_application_by_reporting_year', array['int'],
  'Function facility_application_by_reporting_year should exist'
);

set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

select results_eq(
  $$
  select facility_id from ggircs_portal.facility_application_by_reporting_year(2020) where application_id is not null order by facility_id
  $$,
  $$
  values (1), (2), (3)
  $$,
  'facility_application_by_reporting_year returns applications for the given reporting year'
);

select test_helper.mock_open_window(2019);
select results_eq(
  $$
  select facility_id from ggircs_portal.facility_application_by_reporting_year(null) where application_id is not null order by facility_id
  $$,
  $$
  values (2), (3)
  $$,
  'facility_application_by_reporting_year uses the currently open window when passed null'
);

-- Mock a closed reporting period and a timestamp after the 2018 period close
create or replace function ggircs_portal.opened_reporting_year()
  returns ggircs_portal.reporting_year as
  $$
      select *
      from ggircs_portal.reporting_year
      where null is not null
  $$ language sql stable;
select set_config('search_path','mocks,pg_catalog,public', true);
select set_config(
  'mocks.mocked_timestamp',
  (select extract(epoch from application_close_time + interval '1 day') from ggircs_portal.reporting_year where reporting_year=2018)::varchar,
  true
);

select results_eq(
  $$
  select facility_id from ggircs_portal.facility_application_by_reporting_year(null) where application_id is not null order by facility_id
  $$,
  $$
  values (1)
  $$,
  'facility_application_by_reporting_year uses the last open window when passed null and there is no currently open window'
);

select finish();

rollback;
reset client_min_messages;
