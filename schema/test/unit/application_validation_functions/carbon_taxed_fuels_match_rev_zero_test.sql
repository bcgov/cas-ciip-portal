set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(10);

select has_function(
  'ggircs_portal', 'carbon_taxed_fuels_match_rev_zero', array['ggircs_portal.application_revision'],
  'Function carbon_taxed_fuels_match_rev_zero should exist'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.application_revision_validation_function where validation_function_name = 'carbon_taxed_fuels_match_rev_zero';
  $$,
  $$
    values (1::bigint)
  $$,
  'There should be a function named carbon_taxed_fuels_match_rev_zero in the validation table'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"],
        "form_result": ["_100_timestamps"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;

select test_helper.mock_open_window();
select test_helper.create_test_users();
select test_helper.create_applications(1, True, True);

insert into ggircs_portal.application_revision(application_id, version_number) values (1, 0); -- creating an artificial revision zero with fuel form data
insert into ggircs_portal.form_result(form_id, application_id, version_number, form_result)
  values ((select id from ggircs_portal.form_json where slug='fuel'), 1, 0, '[]');

-- test data
insert into swrs.fuel_carbon_tax_details(normalized_fuel_type, carbon_tax_act_fuel_type_id)
values ('Non carbon taxed test fuel - normalized', null),
       ('Carbon taxed test fuel 1 - normalized', 1),
       ('Carbon taxed test fuel 2 - normalized', 1); -- Aviation fuel

insert into swrs.fuel_mapping(fuel_type, fuel_carbon_tax_details_id)
values ('nCarbonTaxed', (select id from swrs.fuel_carbon_tax_details where normalized_fuel_type='Non carbon taxed test fuel - normalized')),
       ('carbonTaxed1', (select id from swrs.fuel_carbon_tax_details where normalized_fuel_type='Carbon taxed test fuel 1 - normalized')),
       ('carbonTaxed2', (select id from swrs.fuel_carbon_tax_details where normalized_fuel_type='Carbon taxed test fuel 2 - normalized'));

insert into ggircs_portal.fuel(name, swrs_fuel_mapping_id)
values ('nCarbonTaxed', (select id from swrs.fuel_mapping where fuel_type='nCarbonTaxed')),
       ('carbonTaxed1', (select id from swrs.fuel_mapping where fuel_type='carbonTaxed1')),
       ('carbonTaxed2', (select id from swrs.fuel_mapping where fuel_type='carbonTaxed2'));

-- Should return true if there are no fuels
update ggircs_portal.form_result set form_result = '[]'
where application_id = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  true,
  'Returns true if there are no fuels reported'
);

-- Should return true if the fuels match up
update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 10
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100
  }
]')::jsonb where application_id = 1 and version_number = 0 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 10
  }
]')::jsonb where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  true,
  'Returns true if the fuels match up'
);

-- Should return true if the fuels are different but within 0.1%
update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 9.999
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100.01
  }
]')::jsonb where application_id = 1 and version_number = 0 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 10
  }
]')::jsonb where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  true,
  'Returns true if the fuels are different but within 0.1%'
);


-- Should return false if there are fuels in SWRS and not in CIIP
update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 10
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100
  }
]')::jsonb where application_id = 1 and version_number = 0 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

update ggircs_portal.form_result set form_result = ('[]')::jsonb
where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  false,
  'Returns false if there are fuels in SWRS and not in CIIP'
);

-- Should return false if there are fuels in CIIP and not in SWRS
update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 10
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100
  }
]')::jsonb where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

update ggircs_portal.form_result set form_result = ('[]')::jsonb
where application_id = 1 and version_number = 0 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  false,
  'Returns false if there are fuels in CIIP and not in SWRS'
);

-- Should return false if the fuels don't match up within 0.1%
update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 10
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100.11
  }
]')::jsonb where application_id = 1 and version_number = 0 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed2') || ',
    "quantity": 100
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 10
  }
]')::jsonb where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  false,
  'Returns false if the fuels don''t match up within 0.1%'
);

-- Should return true if there are non-carbon-taxed fuels in CIIP that are not in SWRS
update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 5
  }
]')::jsonb where application_id = 1 and version_number = 0 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'nCarbonTaxed') || ',
    "quantity": 100000000
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 5
  }
]')::jsonb where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  true,
  'Returns true if there are non-carbon-taxed fuels in CIIP that are not in SWRS'
);

-- Should return true if the fuel quantities are split on multiple rows
update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 105
  }
]')::jsonb where application_id = 1 and version_number = 0 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

update ggircs_portal.form_result set form_result =
('[
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 5
  },
  {
    "fuelRowId": '|| (select id from ggircs_portal.fuel where name = 'carbonTaxed1') || ',
    "quantity": 100
  }
]')::jsonb where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='fuel');

select is(
  (
    with app_revision as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.carbon_taxed_fuels_match_rev_zero((select * from app_revision))
  ),
  true,
  'Returns true if the fuel quantities are split on multiple rows'
);


select finish();
rollback;
