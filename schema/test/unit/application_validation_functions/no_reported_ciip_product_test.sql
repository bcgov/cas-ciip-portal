set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(6);

select has_function(
  'ggircs_portal', 'no_reported_ciip_product', array['ggircs_portal.application_revision'],
  'Function no_reported_ciip_product should exist'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"],
        "form_result": ["_100_timestamps"],
        "product": ["_protect_read_only_products"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;

select test_helper.mock_open_window();
select test_helper.create_test_users();
select test_helper.create_applications(2, True, True);

update ggircs_portal.form_result
set form_result =
'[
  {
    "productRowId": 1,
    "productUnits": "MWh",
    "isCiipProduct": true,
    "productAmount": 8760000,
    "productEmissions": 5900,
    "requiresProductAmount": true,
    "requiresEmissionAllocation": true
  }
]'
where form_id=(select id from ggircs_portal.form_json where slug = 'production');

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.no_reported_ciip_product((select * from record))),
  false,
  'Function returns false when only energy products are reported'
);

update ggircs_portal.form_result
set form_result =
'[
  {
    "productRowId": 10,
    "productUnits": "MWh",
    "isCiipProduct": true,
    "productAmount": 0,
    "productEmissions": 5900,
    "requiresProductAmount": true,
    "requiresEmissionAllocation": true
  }
]'
where form_id=(select id from ggircs_portal.form_json where slug = 'production');

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.no_reported_ciip_product((select * from record))),
  false,
  'Function returns false when the only valid ciip product is reported with productionAmount = 0'
);

update ggircs_portal.form_result
set form_result =
'[
  {
    "productRowId": 10,
    "productUnits": "MWh",
    "isCiipProduct": false,
    "productAmount": 8760000,
    "productEmissions": 5900,
    "requiresProductAmount": true,
    "requiresEmissionAllocation": true
  }
]'
where form_id=(select id from ggircs_portal.form_json where slug = 'production');
update ggircs_portal.product set is_ciip_product=false where id=10;

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.no_reported_ciip_product((select * from record))),
  false,
  'Function returns false when only non-ciip products are reported'
);

update ggircs_portal.form_result
set form_result =
'[
  {
    "productRowId": 10,
    "productUnits": "MWh",
    "isCiipProduct": true,
    "productAmount": 8760000,
    "productEmissions": 5900,
    "requiresProductAmount": true,
    "requiresEmissionAllocation": true
  }
]'
where form_id=(select id from ggircs_portal.form_json where slug = 'production');
update ggircs_portal.product set is_ciip_product=true where id=10;

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.no_reported_ciip_product((select * from record))),
  true,
  'Function returns true when there is at least one valid ciip product reported with productionAmount > 0'
);

update ggircs_portal.form_result
set form_result =
'[
  {
    "productRowId": 10,
    "productUnits": "MWh",
    "isCiipProduct": true,
    "productAmount": 0,
    "productEmissions": 5900,
    "requiresProductAmount": false,
    "requiresEmissionAllocation": true
  }
]'
where form_id=(select id from ggircs_portal.form_json where slug = 'production');
update ggircs_portal.product set requires_product_amount=false where id=10;

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.no_reported_ciip_product((select * from record))),
  true,
  'Function returns true when there is at least one valid ciip product reported with productionAmount = 0 and requiresProductAmount = false'
);

select finish();

rollback;
