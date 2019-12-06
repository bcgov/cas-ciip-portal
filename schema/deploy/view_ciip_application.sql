-- Deploy ggircs-portal:view_ciip_application to pg
-- requires: table_form_result
-- requires: table_application_status

begin;

create or replace view ggircs_portal.ciip_application as (
    with x as (
      select
        form_result.application_id as id,
        (form_result -> 'facility')::json as facility_data,
        submission_date
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'admin'
    ),
    y as (
      select
        form_result.application_id as id,
        (form_result -> 'operator')::json as operator_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'admin'),
    z as (
      select t.application_status as application_status, t.created_at, t.application_id as id
      from ggircs_portal.application_status t
      join (select application_id, max(created_at) as max_date
      from ggircs_portal.application_status
      group by application_id)a on a.application_id = t.application_id and a.max_date = t.created_at
    )
    select
       x.id,
       (x.facility_data ->> 'facilityName')::varchar(1000) as facility_name,
       (y.operator_data ->> 'name')::varchar(1000) as operator_name,
       x.submission_date as submission_date,
       (x.facility_data ->> 'bcghgid')::numeric as bcghgid,
       z.application_status as application_status,
       '2018'::varchar(1000) as reporting_year

    from x,y,z where x.id = y.id and x.id = z.id
);
-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_application is E'@primaryKey id\n@foreignKey (id) references ggircs_portal.application (id)';


commit;
