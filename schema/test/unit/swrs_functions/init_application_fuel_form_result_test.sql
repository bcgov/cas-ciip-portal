set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(3);

select has_function(
  'ggircs_portal', 'init_application_fuel_form_result', array['integer', 'integer'],
  'Function init_application_fuel_form_result should exist'
);

-- Test setup
select test_helper.modify_triggers('disable');
update swrs.fuel set annual_fuel_amount = null, fuel_units='asdf';
update swrs.report set reporting_period_duration=2020;

-- update form result with results from init function (so we can check the results in the ciip_fuel view)
update ggircs_portal.form_result
set form_result = (select * from ggircs_portal.init_application_fuel_form_result(1, 2020))
where application_id=1
and version_number=1
and form_id=3;

select results_eq(
  $$
    select fuel_units from ggircs_portal.ciip_fuel where application_id=1 and version_number=1 order by fuel_units desc limit 1
  $$,
  $$
    select units from ggircs_portal.fuel
    where id in (select fuel_id from ggircs_portal.ciip_fuel where application_id=1 and version_number=1)
    order by units desc limit 1
  $$,
  'Fuel units were pulled from the ciip fuel table'
);

select is(
  (select quantity from ggircs_portal.ciip_fuel where application_id=1 and version_number=1 limit 1),
  0::numeric,
  'Null annual_fuel_amount in swrs.fuel was coalesced to 0'
);

select finish();

rollback
