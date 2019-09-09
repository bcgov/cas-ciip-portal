-- Deploy ggircs-portal:view_ciip_operator to pg
-- requires: table_form_result

BEGIN;

create view ggircs_portal.ciip_operator as (
    with x as (
      select
        cast(id as text) as id,
        json_array_elements((form_result -> 'reporting_operation_information')::json) as operator_data
      from ggircs_portal.form_result
    )
    select
       x.id as application_id,
       (x.operator_data ->> 'bc_corporate_registry_number')::numeric as bc_corporate_registry_number,
       (x.operator_data ->> 'naics_code')::numeric as naics_code,
       x.operator_data ->> 'operator_name' as operator_name,
       x.operator_data ->> 'operator_trade_name' as operator_trade_name,
       (x.operator_data ->> 'duns_number')::numeric as duns_number
       -- add operator address to address view
    from x
 );

comment on view ggircs_portal.ciip_operator is 'The view for operator data reported in the application';
comment on column ggircs_portal.ciip_operator.operator_name is 'The name of the operator';
comment on column ggircs_portal.ciip_operator.application_id is 'The application id used for reference and join';
comment on column ggircs_portal.ciip_operator.bc_corporate_registry_number is 'The operator longitude';
comment on column ggircs_portal.ciip_operator.naics_code is 'The operator naics code';
comment on column ggircs_portal.ciip_operator.duns_number is 'The Duns no.';


COMMIT;
