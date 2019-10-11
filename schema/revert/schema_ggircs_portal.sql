-- Revert ggircs-portal:schema_ggircs_portal from pg

begin;

drop schema ggircs_portal;

commit;
