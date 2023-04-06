-- Revert ggircs-portal:policies/ciip_user_policies_004_analysts_update_reporters from pg

begin;

do
  $do$
    begin
      revoke update on ggircs_portal.ciip_user from ciip_administrator;
      perform ggircs_portal_private.grant_permissions('update', 'ciip_user', 'ciip_administrator',
        ARRAY['first_name', 'last_name', 'email_address', 'occupation', 'phone_number', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by']);
      revoke update on ggircs_portal.ciip_user from ciip_analyst;
      perform ggircs_portal_private.grant_permissions('update', 'ciip_user', 'ciip_analyst',
        ARRAY['first_name', 'last_name', 'email_address', 'occupation', 'phone_number', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by']);

      perform ggircs_portal_private.upsert_policy(
        'ciip_analyst_update_ciip_user',
        'ciip_user',
        'update',
        'ciip_analyst',
        $$uuid=(select sub from ggircs_portal.session())$$
      );
    end;
  $do$;

commit;
