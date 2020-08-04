-- Deploy ggircs-portal:policies/review_comment_policies to pg
-- requires: tables/review_comment

begin;

create or replace function ggircs_portal_private.get_valid_review_comments()
returns setof integer as
$fn$
  select a.id from ggircs_portal.application a
    join ggircs_portal.facility f
      on a.facility_id = f.id
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session())
$fn$ language sql strict stable;

create or replace function ggircs_portal_private.analyst_owns_comment()
returns integer as
$fn$
  select id from ggircs_portal.ciip_user
    where uuid = (select sub from ggircs_portal.session())
$fn$ language sql strict stable;

grant execute on function ggircs_portal_private.get_valid_review_comments to ciip_administrator, ciip_analyst, ciip_industry_user;
grant execute on function ggircs_portal_private.analyst_owns_comment to ciip_administrator, ciip_analyst, ciip_industry_user;

do
$policy$
declare industry_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_review_comment', 'review_comment', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_review_comment', 'review_comment', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_review_comment', 'review_comment', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_review_comment', 'review_comment', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_review_comment', 'review_comment', 'insert', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_update_review_comment', 'review_comment', 'update', 'ciip_analyst', 'created_by=(select ggircs_portal_private.analyst_owns_comment())');

-- statement for select using & insert with check
industry_user_statement := $$
                             application_id in (select ggircs_portal_private.get_valid_review_comments())
                             and comment_type='requested change'
                           $$;

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_review_comment', 'review_comment', 'select', 'ciip_industry_user', industry_user_statement);

end
$policy$;

commit;
