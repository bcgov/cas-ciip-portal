-- Deploy ggircs-portal:view_ciip_emission to pg
-- requires: table_application

begin;
create view ggircs_portal.ciip_emission as
(
with source_types as (
  select application_id, version_number, json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type
  from ggircs_portal.form_result
  where form_id = 2
),
     gases as (
       select application_id, version_number,
              (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name,
              json_array_elements((source_type ->> 'gases')::json) as gases
       from source_types
     )
select application_id, version_number,
       source_type_name,
       (gases ->> 'gwp')::numeric            as gwp,
       (gases ->> 'gasType')::varchar(1000)  as gas_type,
       (gases ->> 'annualCO2e')::numeric     as annual_co2e,
       (gases ->> 'annualEmission')::numeric as annual_emission,
       (gases ->> 'gasDescription')::varchar(1000) as gas_description
from gases
  );

grant select on table ggircs_portal.ciip_emission to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_emission is E'@omit\n The view for emission data reported in an application';
comment on column ggircs_portal.ciip_emission.application_id is 'The application id';
comment on column ggircs_portal.ciip_emission.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_emission.source_type_name is 'The type of the emission source';
comment on column ggircs_portal.ciip_emission.gas_type is 'The emitted gas';
comment on column ggircs_portal.ciip_emission.gwp is 'The gas'' global warming potential';
comment on column ggircs_portal.ciip_emission.annual_co2e is 'The CO2 equivalent (in tonnes) emitted (annual_emission * gwp)';
comment on column ggircs_portal.ciip_emission.annual_emission is 'The amount of gas emitted (in tonnes)';
comment on column ggircs_portal.ciip_emission.gas_description is 'The description of the gas';

commit;
