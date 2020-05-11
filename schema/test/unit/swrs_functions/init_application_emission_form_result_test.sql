set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(12);

select has_function(
  'ggircs_portal', 'init_application_emission_form_result', array['integer', 'integer'],
  'Function init_application_emission_form_result should exist'
);

--update swrs.emission
--set emission_units = E'string\nwith\nnewlines'
--where report_id = (
--  select report_id from ggircs_portal.facility where id = 1
--);

select lives_ok(
format($$
select ggircs_portal.init_application_emission_form_result(
  %1$s, (
    select reporting_period_duration
    from swrs.report
    where id = (
      select report_id from ggircs_portal.facility where id = %1$s
      )
    )
);
$$, _f_id),
'init_application_emission_form_result can load all facilities'
) from (select id from ggircs_portal.facility) _f_id;


select lives_ok(
$$
select ggircs_portal.init_application_emission_form_result(
  1, 2000
);
$$,
'init_application_emission_form_result can initialize data for a facility for a year with no swrs report'
);

select set_hasnt(
  $$
  with source_types as (
    select json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type
    from ggircs_portal.form_result
    where form_id = 2
  ),
  all_source_type_names as (
    select (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name
    from source_types)
  select * from all_source_type_names;
  $$,
  $$
    select 'Other, non-carbon taxed'
  $$,
  'Other, non-carbon taxed emission category is not included in the form result after running init_application_emission_form_result'
);



select finish();

rollback
