
-- Setup script for the mutations smoke/perf test
-- We need to make sure that the user executing the queries (cypress test reporter)
-- has access to the test organisations

-- This script adds the cypress reporter to all organisations in the system

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
)
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) 
  select user_id, organisation_id, status::ggircs_portal.ciip_user_organisation_status from user_orgs;


select test_helper.modify_triggers('enable');

commit;
