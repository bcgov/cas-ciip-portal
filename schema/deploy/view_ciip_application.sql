-- Deploy ggircs-portal:view_ciip_application to pg
-- requires: table_form_result
-- requires: table_application_status

BEGIN;

create view ggircs_portal.ciip_application as (
    with x as (
      select
        cast(form_result.id as text) as id,
        json_array_elements((form_result -> 'facility_information')::json) as facility_data,
        json_array_elements((form_result -> 'reporting_operation_information')::json) as operator_data,
        submission_date,
        application_status
      from ggircs_portal.form_result
      join ggircs_portal.application_status
      on form_result.id = application_status.form_result_id
    )
    select
       x.id,
       x.facility_data ->> 'facility_name' as facility_name,
       x.operator_data ->> 'operator_name' as operator_name,
       x.submission_date as submission_date,
       (x.facility_data ->> 'bcghgid')::numeric as bcghgid,
       x.application_status as application_status,
       '2018' as reporting_year

    from x
);

COMMIT;
