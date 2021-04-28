-- Revert ggircs-portal:types/production_form_data from pg

begin;

drop type ggircs_portal.production_form_data;

commit;
