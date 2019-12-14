-- Deploy ggircs-portal:view_ciip_emission to pg
-- requires: table_application

begin;
create view ggircs_portal.ciip_emission as
(
with source_types as (
  select application_id, json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type
  from ggircs_portal.form_result
  where form_id = 2
),
     gases as (
       select application_id,
              (source_type ->> 'sourceTypeName')                   as source_type_name,
              json_array_elements((source_type ->> 'gases')::json) as gases
       from source_types
     )
select application_id,
       source_type_name,
       (gases ->> 'gwp')                     as gwp,
       (gases ->> 'gasType')                 as gas_type,
       (gases ->> 'annualCO2e')::numeric     as annual_co2e,
       (gases ->> 'annualEmission')::numeric as annual_emission,
       (gases ->> 'gasDescription')          as gas_description
from gases
  );


commit;
