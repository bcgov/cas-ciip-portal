-- Setup script for the mutations smoke/perf test
-- We need to make sure that the user executing the queries (cypress test reporter)
-- has access to the test organisations

-- This script adds the cypress reporter to all organisations in the system
-- in an idempotent way

begin;

-- Temporarily disable _set_user_id trigger in order to hardcode user_id into table ccip_user_organisation
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;

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

-- Re-enable _set_user_id trigger
alter table ggircs_portal.ciip_user_organisation
  enable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_access_approved_email;

commit;
