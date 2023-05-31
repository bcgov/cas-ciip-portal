
-- Setup script for the mutations smoke/perf test
-- We need to make sure that the user executing the queries (cypress test reporter)
-- has access to the test organisations

-- This script adds the cypress reporter to all organisations in the system
-- in an idempotent way

begin;

select test_helper.modify_triggers('disable');

with user_orgs as (
  select 
    cu.id as user_id, 
    o.id as organisation_id, 
    'approved' as status
  from ggircs_portal.organisation o
  left join lateral 
    (select id from ggircs_portal.ciip_user where first_name='Cypress' and last_name='Reporter') cu 
  on true
  where not exists 
    (select 1 from ggircs_portal.ciip_user_organisation where organisation_id = o.id and user_id = cu.id)
)
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) 
  select user_id, organisation_id, status::ggircs_portal.ciip_user_organisation_status from user_orgs;

-- we make sure there aren't any applications in the system
truncate table ggircs_portal.application restart identity cascade;

-- add an application for uploads to use. id will be 1 as we reset the identity
select test_helper.create_applications(1, True, false);

-- -- add more facilites
truncate table ggircs_portal.facility restart identity cascade;
do $$
begin
  for counter in 1..1002 loop
    insert into ggircs_portal.facility(organisation_id, swrs_report_id)
      values (
        (select organisation_id from ggircs_portal.ciip_user_organisation
          where user_id = (select id from ggircs_portal.ciip_user where first_name='Cypress' and last_name='Reporter') limit 1),
        counter);
  end loop;
end; $$;

select test_helper.modify_triggers('enable');

commit;
