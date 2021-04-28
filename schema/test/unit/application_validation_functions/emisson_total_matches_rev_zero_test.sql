set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'emission_total_matches_rev_zero', array['ggircs_portal.application_revision'],
  'Function emission_total_matches_rev_zero should exist'
);

select test_helper.clean_ggircs_portal_schema();
select test_helper.modify_triggers('disable');
-- select test_helper.mock_open_window();

with org_id as (insert into ggircs_portal.organisation(operator_name) values ('Operator1') returning id),
fac_id as (insert into ggircs_portal.facility(facility_name, organisation_id
) values ('Facility1', (select * from org_id)) returning id),
app_id as (insert into ggircs_portal.application(facility_id) values ((select * from fac_id)) returning id)
insert into ggircs_portal.application_revision(application_id, version_number) values ((select * from app_id), 0), ((select * from app_id), 1);

-- select test_helper.create_applications(1, true, true);



-- Computed column returns the sum of (ciip) emissions for an application revision.
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
  'should be true'
 );

select finish();
rollback;
