-- Deploy ggircs-portal:policies/ciip_user_policies_003_restrict_permissions to pg
-- requires: policies/ciip_user_policies_002_recreate_after_type_change

begin;

create or replace function ggircs_portal_private.get_valid_users()
returns setof integer as
$fn$
  select user_id
  from ggircs_portal.ciip_user_organisation
  where organisation_id
  in (
    select organisation_id
    from ggircs_portal.ciip_user_organisation
    where status = 'approved'
    and user_id=(
      (select id from ggircs_portal.ciip_user where uuid = ((select sub from ggircs_portal.session()))
      )
    )
  )
  union
  select id from ggircs_portal.ciip_user where uuid ilike '%@idir';
$fn$ language sql strict stable security definer;

grant execute on function ggircs_portal_private.get_valid_users to ciip_administrator, ciip_analyst, ciip_industry_user;

do
$policy$
declare industry_user_statement text;
begin
industry_user_statement := 'id in (select ggircs_portal_private.get_valid_users())';

-- ciip_industry_user RLS select policy
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_ciip_user', 'ciip_user', 'select', 'ciip_industry_user', industry_user_statement);

end
$policy$;

commit;

create or replace function ggircs_portal_private.get_valid_users()
returns setof integer as
$fn$
  with valid_orgs as (
    select organisation_id
    from ggircs_portal.ciip_user_organisation
    where status = 'approved'
    and user_id=(
      (select id from ggircs_portal.ciip_user where uuid = ((select sub from ggircs_portal.session()))
      )
    )
  )
  select user_id
  from ggircs_portal.ciip_user_organisation
  where organisation_id
  in (select * from valid_orgs)
  union
  select id from ggircs_portal.ciip_user where uuid ilike '%@idir';
$fn$ language sql strict stable security definer;
