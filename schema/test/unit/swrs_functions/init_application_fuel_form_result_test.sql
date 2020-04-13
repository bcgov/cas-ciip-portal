set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(2);

select has_function(
  'ggircs_portal', 'init_application_fuel_form_result', array['integer', 'integer'],
  'Function init_application_fuel_form_result should exist'
);

update swrs.fuel
set fuel_units = E'string\nwith\nnewlines'
where report_id = (
  select report_id from ggircs_portal.facility where id = 1
);

select lives_ok($$
select ggircs_portal.init_application_fuel_form_result(
  1, (
    select reporting_period_duration
    from swrs.report
    where id = (
      select report_id from ggircs_portal.facility where id = 1
      )
    )
);
$$,
'init_application_fuel_form_result can load strings with newlines into json objects');

select finish();

rollback
