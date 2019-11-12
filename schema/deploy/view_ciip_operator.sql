-- Deploy ggircs-portal:view_ciip_operator to pg
-- requires: table_form_result

begin;

create view ggircs_portal.ciip_operator as (
    with x as (
      select
        form_result.application_id as id,
        json_array_elements((form_result -> 'reportingOperationInformation')::json) as operator_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Admin'
    )
    select
       x.id,
       (x.operator_data ->> 'bcCorporateRegistryNumber')::numeric as bc_corporate_registry_number,
       (x.operator_data ->> 'naicsCode')::numeric as naics_code,
       (x.operator_data ->> 'operatorName')::varchar(1000) as operator_name,
       (x.operator_data ->> 'operatorTradeName')::varchar(1000) as operator_trade_name,
       (x.operator_data ->> 'dunsNumber')::numeric as duns_number
       -- add operator address to address view
    from x
 );

-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_operator is E'@primaryKey id';

-- TODO(Dylan): Regular comments are interfering with postgraphile smart comments.
-- comment on view ggircs_portal.ciip_operator is 'The view for operator data reported in the application';
-- comment on column ggircs_portal.ciip_operator.operator_name is 'The name of the operator';
-- comment on column ggircs_portal.ciip_operator.application_id is 'The application id used for reference and join';
-- comment on column ggircs_portal.ciip_operator.bc_corporate_registry_number is 'The operator longitude';
-- comment on column ggircs_portal.ciip_operator.naics_code is 'The operator naics code';
-- comment on column ggircs_portal.ciip_operator.duns_number is 'The Duns no.';

commit;
