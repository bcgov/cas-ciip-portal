-- Revert ggircs-portal:policies/ciip_user_policies_003_restrict_permissions from pg

begin;



do
$policy$
begin

perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_ciip_user', 'ciip_user', 'select', 'ciip_industry_user', 'true');

end
$policy$;

commit;
