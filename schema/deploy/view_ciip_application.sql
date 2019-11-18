-- Deploy ggircs-portal:view_ciip_application to pg
-- requires: table_form_result
-- requires: table_application_status

begin;

create view ggircs_portal.ciip_application as (
    with x as (
      select
        form_result.application_id as id,
        (form_result -> 'facility')::json as facility_data,

        submission_date,
        application_status
      from ggircs_portal.form_result
      join ggircs_portal.application_status
      on form_result.application_id = application_status.application_id
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Admin'
    ),
    y as (
      select
        form_result.application_id as id,
        (form_result -> 'reportingOperationInformation')::json as operator_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Admin')

    select
       x.id,
       (x.facility_data ->> 'facilityName')::varchar(1000) as facility_name,
       (y.operator_data ->> 'operatorName')::varchar(1000) as operator_name,
       x.submission_date as submission_date,
       (x.facility_data ->> 'bcghgid')::numeric as bcghgid,
       x.application_status as application_status,
       '2018'::varchar(1000) as reporting_year

    from x,y where x.id = y.id
);
-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_application is E'@primaryKey id';

commit;
