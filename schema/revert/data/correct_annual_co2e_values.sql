-- Revert ggircs-portal:data/correct_annual_co2e_values from pg

begin;

-- No need to revert the function because it is just re-calculating values based on the gwp values and the annualEmission values

commit;
