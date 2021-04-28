-- Revert ggircs-portal:types/emission_form_result from pg

begin;

drop type ggircs_portal.emission_form_result;

commit;
