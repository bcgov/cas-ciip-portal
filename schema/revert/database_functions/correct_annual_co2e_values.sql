-- Revert ggircs-portal:database_functions/correct_annual_co2e_values from pg

begin;

drop function ggircs_portal_private.correct_annual_co2e_values;

commit;
