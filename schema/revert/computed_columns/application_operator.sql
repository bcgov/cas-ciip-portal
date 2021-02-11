-- Revert ggircs-portal:computed_columns/application_operator from pg

begin;

drop function ggircs_portal.application_operator;

commit;
