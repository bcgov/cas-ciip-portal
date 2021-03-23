-- Revert ggircs-portal:mutations/create_naics_code from pg

begin;

drop function ggircs_portal.create_naics_code;

commit;
