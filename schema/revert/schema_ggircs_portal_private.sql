-- Revert ggircs-portal:schema_ggircs_portal_private from pg

begin;

drop schema ggircs_portal_private;

commit;
