set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(6);

-- Clean schema
-- select test_helper.clean_ggircs_portal_schema();
truncate ggircs_portal.application restart identity cascade;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
select test_helper.mock_open_window();
-- Create facilities / applications
select test_helper.create_applications(4, True, True);

update ggircs_portal.application set reporting_year = 2022 where id != 4;
update ggircs_portal.application set reporting_year = 2021 where id = 4;
update ggircs_portal.application_revision set created_at = '2021-01-01'::timestamptz where application_id=1;
update ggircs_portal.application_revision set created_at = '2023-05-01'::timestamptz where application_id=2;
update ggircs_portal.application_revision set created_at = '2023-06-01'::timestamptz where application_id=3;
update ggircs_portal.application_revision set created_at = '2023-05-01'::timestamptz where application_id=4;

update ggircs_portal.form_result set form_result='{"test": "dont change me"}' where form_id !=2;

alter table ggircs_portal.form_result disable trigger _100_timestamps, disable trigger _immutable_form_result;

select ggircs_portal_private.correct_gwp_values();

alter table ggircs_portal.form_result enable trigger _100_timestamps, enable trigger _immutable_form_result;

select set_eq (
  $$
    with source_types as (
      select application_id,
            version_number,
            json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type,
            (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
        on form_result.form_id = form_json.id
        and form_json.slug in ('emission', 'emission-2018')
    ),
        gases as (
          select application_id, version_number,
                  (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name,
                  json_array_elements((source_type ->> 'gases')::json) as gases,
                  comments
          from source_types
        )
    select distinct((gases ->> 'gwp')::numeric)            as gwp
    from gases
    where application_id = 1 and version_number=1
  $$,
  $$
  select distinct gwp from ggircs_portal.gwp where reporting_year_start < 2022
  $$,
  'Application with ID 1 was unaffected because it was created before April 1st 2023'
);

select set_eq (
  $$
    with source_types as (
      select application_id,
            version_number,
            json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type,
            (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
        on form_result.form_id = form_json.id
        and form_json.slug in ('emission', 'emission-2018')
    ),
        gases as (
          select application_id, version_number,
                  (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name,
                  json_array_elements((source_type ->> 'gases')::json) as gases,
                  comments
          from source_types
        )
    select distinct((gases ->> 'gwp')::numeric)            as gwp
    from gases
    where application_id = 2 and version_number=1
  $$,
  $$
  select distinct gwp from ggircs_portal.gwp where reporting_year_start = 2022 or gwp = 1
  $$,
  'Application with ID 2 was updated because it was created between April 1st 2023 and May 30 2023'
);

select set_eq (
  $$
    with source_types as (
      select application_id,
            version_number,
            json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type,
            (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
        on form_result.form_id = form_json.id
        and form_json.slug in ('emission', 'emission-2018')
    ),
        gases as (
          select application_id, version_number,
                  (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name,
                  json_array_elements((source_type ->> 'gases')::json) as gases,
                  comments
          from source_types
        )
    select distinct((gases ->> 'gwp')::numeric)            as gwp
    from gases
    where application_id = 3 and version_number=1
  $$,
  $$
  select distinct gwp from ggircs_portal.gwp where reporting_year_start < 2022
  $$,
  'Application with ID 3 was unaffected because it was created after May 30th 2023'
);

select set_eq (
  $$
    with source_types as (
      select application_id,
            version_number,
            json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type,
            (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
        on form_result.form_id = form_json.id
        and form_json.slug in ('emission', 'emission-2018')
    ),
        gases as (
          select application_id, version_number,
                  (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name,
                  json_array_elements((source_type ->> 'gases')::json) as gases,
                  comments
          from source_types
        )
    select distinct((gases ->> 'gwp')::numeric)            as gwp
    from gases
    where application_id = 4 and version_number=1
  $$,
  $$
  select distinct gwp from ggircs_portal.gwp where reporting_year_start < 2022
  $$,
  'Application with ID 4 was unaffected because it is from the 2021 reporting year'
);

select is (
  (
    select form_result from ggircs_portal.form_result where application_id = 2 and version_number = 1 and form_id=3
  ),
  (
    '{"test": "dont change me"}'
  ),
  'Other form result records for application ID=2 were not changed'
);

alter table ggircs_portal.form_result disable trigger _100_timestamps, disable trigger _immutable_form_result;

select ggircs_portal_private.correct_gwp_values();

alter table ggircs_portal.form_result enable trigger _100_timestamps, enable trigger _immutable_form_result;

select set_eq (
  $$
    with source_types as (
      select application_id,
            version_number,
            json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type,
            (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
        on form_result.form_id = form_json.id
        and form_json.slug in ('emission', 'emission-2018')
    ),
        gases as (
          select application_id, version_number,
                  (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name,
                  json_array_elements((source_type ->> 'gases')::json) as gases,
                  comments
          from source_types
        )
    select distinct((gases ->> 'gwp')::numeric)            as gwp
    from gases
    where application_id = 2 and version_number=1
  $$,
  $$
  select distinct gwp from ggircs_portal.gwp where reporting_year_start = 2022 or gwp = 1
  $$,
  'Function is idempotent'
);

select finish();

rollback;
