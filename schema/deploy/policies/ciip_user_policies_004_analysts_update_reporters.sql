-- Deploy ggircs-portal:policies/ciip_user_policies_004_analysts_update_reporters to pg
-- requires: policies/ciip_user_policies_003_restrict_permissions

begin;
do
  $do$
    begin
      perform ggircs_portal_private.grant_permissions('update', 'ciip_user', 'ciip_administrator',
        ARRAY['first_name', 'last_name', 'email_address', 'occupation', 'phone_number', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by', 'allow_uuid_update']);

      perform ggircs_portal_private.grant_permissions('update', 'ciip_user', 'ciip_analyst',
        ARRAY['first_name', 'last_name', 'email_address', 'occupation', 'phone_number', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by', 'allow_uuid_update']);

      perform ggircs_portal_private.upsert_policy(
        'ciip_analyst_update_ciip_user',
        'ciip_user',
        'update',
        'ciip_analyst',
        $$uuid=(select sub from ggircs_portal.session()) or uuid !~ 'idir'$$
      );
    end;
  $do$;
end;
