-- Revert ggircs-portal:computed_columns/ciip_user_organisation_email_address from pg

begin;

drop function ggircs_portal.ciip_user_organisation_email_address;

commit;
