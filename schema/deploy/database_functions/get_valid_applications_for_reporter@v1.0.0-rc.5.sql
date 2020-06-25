-- Deploy ggircs-portal:database_functions/get_valid_applications_for_reporter to pg
-- requires: tables/application

begin;

create or replace function ggircs_portal_private.get_valid_applications_for_reporter()
returns setof integer as
$fn$
  select a.id from ggircs_portal.application a
    join ggircs_portal.facility f
      on a.facility_id = f.id
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session());
$fn$ language sql strict stable security definer;

grant execute on function ggircs_portal_private.get_valid_applications_for_reporter to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.get_valid_applications_for_reporter() is 'Function returns a list of application ids that shouuld be available to a reporter via row-level security';

commit;
