set client_encoding = 'utf-8';
set client_min_messages = warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select * from no_plan();

-- View should exist
select has_view(
    'ggircs_portal', 'ciip_carbon_tax_calculation',
    'ggircs_portal.ciip_carbon_tax_calculation should be a view'
);

-- Populate fuel table
insert into ggircs_portal.fuel(id, name, units, state, swrs_fuel_mapping_id)
overriding system value
values
  (11,'Butane','kL', 'active', 16),
  (13,'C/D Waste - Plastic','t', 'active', 18),
  (14,'C/D Waste - Wood','t', 'active', 19);

-- Populate Organisation
insert into ggircs_portal.organisation(id, report_id) overriding system value values (1,1);

-- Populate Facility
insert into ggircs_portal.facility(id, organisation_id) overriding system value values (1,1);

insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, application_open_date, application_end_date, application_response_date)
values (
  2018, now(), now(), now(), now(), now()
);

-- Populate Application
insert into ggircs_portal.application(ID, facility_id, reporting_year) overriding system value values(1, 1, 2018);

-- Populate form_json
insert into ggircs_portal.form_json
  (id, name, slug, short_name, description, form_json, prepopulate_from_ciip,prepopulate_from_swrs)
overriding system value
values
(1, 'a', 'fuel', 'a', 'a', '{}', 'false', 'false');

-- Populate Application Revision table
insert into ggircs_portal.application_revision(application_id, version_number, created_at) overriding system value
values (1,1, '2019-09-17 14:49:54.191757-07');

-- Populate form result table
insert into ggircs_portal.form_result
  (id, form_id, version_number, application_id, form_result)
overriding system value
values
  (1,1,1,1, '[{"fuelType": "C/D Waste - Plastic", "quantity": 4, "fuelUnits": "t", "methodology": "wci 1.0"}, {"fuelType": "Butane", "quantity": 400, "fuelUnits": "kL", "methodology": "wci 1.0"}]');

-- Populate needed fuel_mapping values
INSERT INTO swrs.fuel_mapping (id, fuel_type, fuel_carbon_tax_details_id) overriding system value values (1,'Acetylene', 1);
INSERT INTO swrs.fuel_mapping (id, fuel_type, fuel_carbon_tax_details_id) overriding system value values (16,'Butane (kilolitres)', 11);
INSERT INTO swrs.fuel_mapping (id, fuel_type, fuel_carbon_tax_details_id) overriding system value values (18,'C/D Waste - Plastic (tonnes)', 13);
INSERT INTO swrs.fuel_mapping (id, fuel_type, fuel_carbon_tax_details_id) overriding system value values (19,'C/D Waste - Wood (tonnes)', 14);

-- Populate needed ct details values
insert into swrs.fuel_carbon_tax_details (id, normalized_fuel_type, state, carbon_taxed, cta_mapping, cta_rate_units, unit_conversion_factor) overriding system value values (11, 'Butane (kilolitres)','(Liquid)','t','Butane','$/litre',1000);
insert into swrs.fuel_carbon_tax_details (id, normalized_fuel_type, state, carbon_taxed, cta_mapping, cta_rate_units, unit_conversion_factor) overriding system value values (13, 'C/D Waste - Plastic (tonnes)','(Solid)','f','n/a','n/a',1);
insert into swrs.fuel_carbon_tax_details (id, normalized_fuel_type, state, carbon_taxed, cta_mapping, cta_rate_units, unit_conversion_factor) overriding system value values (14, 'C/D Waste - Wood (tonnes)','(Solid)','f','n/a','n/a',1);

-- Populated needed fuel charge values
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (0.0528, '1899-12-30', '2017-03-31', 16);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (0.0528, '2017-04-01', '2018-03-31', 16);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (0.0616, '2018-04-01', '2019-03-31', 16);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (0.0704, '2019-04-01', '2020-03-31', 16);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (0.0792, '2020-04-01', '2021-03-31', 16);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (0.088, '2021-04-01', '9999-12-31', 16);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '1899-12-30', '2017-03-31', 18);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2017-04-01', '2018-03-31', 18);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2018-04-01', '2019-03-31', 18);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2019-04-01', '2020-03-31', 18);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2020-04-01', '2021-03-31', 18);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2021-04-01', '9999-12-31', 18);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '1899-12-30', '2017-03-31', 19);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2017-04-01', '2018-03-31', 19);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2018-04-01', '2019-03-31', 19);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2019-04-01', '2020-03-31', 19);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2020-04-01', '2021-03-31', 19);
INSERT INTO swrs.fuel_charge (fuel_charge, start_date, end_date, fuel_mapping_id) VALUES (null, '2021-04-01', '9999-12-31', 19);

select 'ct data';
select * from ggircs_portal.get_carbon_tax_data();
select 'APP';
select * from ggircs_portal.application;
select 'FUEL';
select * from ggircs_portal.fuel;
select 'CIIP FUEL';
select * from ggircs_portal.ciip_fuel;

-- Carbon tax calculator calculates correct tax for Butane
select results_eq(
  $$select calculated_carbon_tax from ggircs_portal.ciip_carbon_tax_calculation where fuel_type = 'Butane'$$,
  'select 21120.00',
  'Carbon tax calculator calculates correct tax for Butane'
);

select * from finish();
rollback;
