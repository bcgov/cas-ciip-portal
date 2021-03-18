-- Revert ggircs-portal:mutations/create_naics_mutation from pg

begin;

drop function ggircs_portal.create_naics_mutation;

commit;
