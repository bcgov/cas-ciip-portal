set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(8);

select has_function(
  'ggircs_portal', 'emission_total_matches_rev_zero', array['ggircs_portal.application_revision'],
  'Function emission_total_matches_rev_zero should exist'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.application_revision_validation_function where validation_function_name = 'emission_total_matches_rev_zero';
  $$,
  $$
    values (1::bigint)
  $$,
  'There should be a function named emission_total_matches_rev_zero in the validation table'
);

select test_helper.clean_ggircs_portal_schema();
select test_helper.modify_triggers('disable');

with
  org_id as (
    insert into ggircs_portal.organisation(operator_name)
    values ('Operator1')
    returning id
  ),
  fac_id as (
    insert into ggircs_portal.facility(facility_name, organisation_id)
    values ('Facility1', (select * from org_id))
    returning id
  ),
  app_id as (
    insert into ggircs_portal.application(facility_id)
    values ((select * from fac_id))
    returning id
  )
insert into ggircs_portal.application_revision(application_id, version_number)
values
  ((select * from app_id), 0),
  ((select * from app_id), 1);


-- Should return true when both emissions are equal
create or replace function ggircs_portal.application_revision_total_ciip_emissions(application_revision ggircs_portal.application_revision)
returns numeric
  as $$
    select 99::numeric;
  $$ language sql stable;


select results_eq (
  $$
    select ggircs_portal.emission_total_matches_rev_zero((select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1))
  $$,
  $$
    VALUES ('true'::boolean)
  $$,
  'emission_total_matches_rev_zero should return true when emissions are strictly equal'
 );

-- Should return true when both emissions are 9.99 tCO2e apart
create or replace function ggircs_portal.application_revision_total_ciip_emissions(application_revision ggircs_portal.application_revision)
returns numeric
  as $$
    select case
      when application_revision.version_number = 0 then 1000.0
      else 1009.9
    end;
  $$ language sql stable;


select results_eq (
  $$
    select ggircs_portal.emission_total_matches_rev_zero((select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1))
  $$,
  $$
    VALUES ('true'::boolean)
  $$,
  'emission_total_matches_rev_zero should return true when emissions are less than 10 apart'
 );

-- Should return true when both emissions are -9.99 tCO2e apart
create or replace function ggircs_portal.application_revision_total_ciip_emissions(application_revision ggircs_portal.application_revision)
returns numeric
  as $$
    select case
      when application_revision.version_number = 0 then 1000.0
      else 990.1
    end;
  $$ language sql stable;


select results_eq (
  $$
    select ggircs_portal.emission_total_matches_rev_zero((select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1))
  $$,
  $$
    VALUES ('true'::boolean)
  $$,
  'emission_total_matches_rev_zero should return true when emissions are less than -10 apart'
 );


-- Should return false when emissions are  > 9.99 tCO2e apart
create or replace function ggircs_portal.application_revision_total_ciip_emissions(application_revision ggircs_portal.application_revision)
returns numeric
  as $$
    select case
      when application_revision.version_number = 0 then 1000.0
      else 28973582475.1
    end;
  $$ language sql stable;


select results_eq (
  $$
    select ggircs_portal.emission_total_matches_rev_zero((select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1))
  $$,
  $$
    VALUES ('false'::boolean)
  $$,
  'emission_total_matches_rev_zero should return false when emissions are more than 10 apart'
 );


-- Should return false when emissions are  < -9.99 tCO2e apart
create or replace function ggircs_portal.application_revision_total_ciip_emissions(application_revision ggircs_portal.application_revision)
returns numeric
  as $$
    select case
      when application_revision.version_number = 0 then 1000.0
      else 0
    end;
  $$ language sql stable;


select results_eq (
  $$
    select ggircs_portal.emission_total_matches_rev_zero((select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1))
  $$,
  $$
    VALUES ('false'::boolean)
  $$,
  'mission_total_matches_rev_zero should return false when emissions are more than -10 apart'
 );


-- Should return true when there is no version zero in the system
create or replace function ggircs_portal.application_revision_total_ciip_emissions(application_revision ggircs_portal.application_revision)
returns numeric
  as $$
    select case
      when application_revision.version_number = 1 then 123456.7
      else 1.1
    end;
  $$ language sql stable;

delete from ggircs_portal.application_revision where version_number=0;

select results_eq (
  $$
    select ggircs_portal.emission_total_matches_rev_zero((select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1))
  $$,
  $$
    VALUES ('true'::boolean)
  $$,
  'mission_total_matches_rev_zero should return true when there is no version 0'
 );

select finish();
rollback;
