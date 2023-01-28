-- Deploy ggircs-portal:policies/ciip_user_organisation_policies_003_remove_enum_operator_dependency to pg

begin;

do
  $policy$
  begin

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy(
        'ciip_industry_user_insert_ciip_user_organisation',
        'ciip_user_organisation',
        'insert',
        'ciip_industry_user',
        $$user_id=(select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session())) and status::text='pending'$$
    );

  end
  $policy$;

commit;
