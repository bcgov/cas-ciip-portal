-- Revert ggircs-portal:mutations/custom_create_naics_mutation from pg

begin;

drop function ggircs_portal.custom_create_naics_mutation;

commit;
