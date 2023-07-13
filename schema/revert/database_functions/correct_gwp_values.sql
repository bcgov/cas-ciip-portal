-- Revert ggircs-portal:database_functions/correct_gwp_values from pg

begin;

drop function ggircs_portal_private.correct_gwp_values;

commit;
