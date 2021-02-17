-- Revert ggircs-portal:computed_columns/ciip_user_organisation_operator_name from pg

begin;

drop function ggircs_portal.ciip_user_organisation_operator_name;

commit;
