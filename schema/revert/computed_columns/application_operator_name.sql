-- Revert ggircs-portal:computed_columns/application_operator_name from pg

begin;

drop function ggircs_portal.application_operator_name;

commit;
