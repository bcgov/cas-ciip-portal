-- Revert ggircs-portal:computed_columns/application_bcghgid from pg

begin;

drop function ggircs_portal.application_bcghgid;

commit;
