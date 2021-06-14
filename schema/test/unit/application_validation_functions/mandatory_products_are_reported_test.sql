set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(6);

select has_function(
  'ggircs_portal', 'mandatory_products_are_reported', array['ggircs_portal.application_revision'],
  'Function mandatory_products_are_reported should exist'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.application_revision_validation_function where validation_function_name = 'mandatory_products_are_reported';
  $$,
  $$
    values (1::bigint)
  $$,
  'There should be a function named mandatory_products_are_reported in the validation table'
);


-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
truncate ggircs_portal.naics_code restart identity cascade;
truncate ggircs_portal.product_naics_code restart identity cascade;
truncate ggircs_portal.product restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
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

insert into ggircs_portal.naics_code (naics_code, naics_description) values ('1234','naics with mandatory products');
insert into ggircs_portal.naics_code (naics_code, naics_description) values ('4321','naics without mandatory products');
insert into ggircs_portal.naics_code (naics_code, naics_description) values ('4444','naics with archived mandatory product');

insert into ggircs_portal.product(product_name, product_state) values
  ('Mandatory Product','published'),
  ('Another Mandatory Product','published'),
  ('Optional Product','published'),
  ('Optional Product 2','published'),
  ('Mandatory Archived Product','archived');

insert into ggircs_portal.product_naics_code (product_id, naics_code_id, is_mandatory) values
  ((select id from ggircs_portal.product where product_name='Mandatory Product'), 1, true),
  ((select id from ggircs_portal.product where product_name='Another Mandatory Product'), 1, true),
  ((select id from ggircs_portal.product where product_name='Optional Product'), 1, false),
  ((select id from ggircs_portal.product where product_name='Optional Product 2'), 2, false),
  ((select id from ggircs_portal.product where product_name='Mandatory Product'), 3, true),
  ((select id from ggircs_portal.product where product_name='Mandatory Archived Product'), 1, true);

-- Should return true if all mandatory products have been reported
update ggircs_portal.form_result set form_result = '{"operator": {"naics": "1234"}}'
where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='admin-2020');

update ggircs_portal.form_result set form_result =
'[ {"productAmount": 1234,"productRowId": 1},
   {"productAmount": 11111,"productRowId": 2} ]'
where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='production');

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.mandatory_products_are_reported((select * from record))
  ),
  true,
  'Function returns true if all published mandatory products have been reported'
);

-- Should return true if there are no mandatory products for the NAICS
update ggircs_portal.form_result set form_result = '{"operator": {"naics": "4321"}}'
where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='admin-2020');

update ggircs_portal.form_result set form_result = '[]'
where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='production');

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.mandatory_products_are_reported((select * from record))
  ),
  true,
  'Function returns true if there are no mandatory products for the NAICS code'
);

-- Should return false if there are mandatory products not reported
update ggircs_portal.form_result set form_result = '{"operator": {"naics": "1234"}}'
where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='admin-2020');

update ggircs_portal.form_result set form_result = '[{"productAmount": 1234, "productRowId": 1}]'
where application_id = 1 and version_number = 1 and form_id = (select id from ggircs_portal.form_json where slug='production');

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.mandatory_products_are_reported((select * from record))
  ),
  false,
  'Function returns false if not all mandatory products have been reported'
);

update ggircs_portal.product_naics_code set deleted_at=now() where product_id=2;
select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision
      where application_id=1 and version_number=1
    )
    select ggircs_portal.mandatory_products_are_reported((select * from record))
  ),
  true,
  'Function returns true if the product_naics_code row is deleted (deleted_at is not null)'
);

select finish();
rollback;
