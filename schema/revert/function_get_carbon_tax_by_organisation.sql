-- Revert ggircs-portal:function_get_carbon_tax_by_organisation from pg

BEGIN;

drop function ggircs_portal.get_carbon_tax_by_bcghgid;

COMMIT;
