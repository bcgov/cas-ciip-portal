-- Verify ggircs-portal:policies/ciip_user_policies_004_analysts_update_reporters on pg

begin;

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_ciip_user', 'ciip_user', 'ciip_analyst');

rollback;
