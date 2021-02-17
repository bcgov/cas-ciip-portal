-- Revert ggircs-portal:computed_columns/ciip_user_organisation_first_name from pg

begin;

drop function ggircs_portal.ciip_user_organisation_first_name;

commit;
