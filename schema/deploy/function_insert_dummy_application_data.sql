-- Deploy ggircs-portal:function_insert_dummy_application_data to pg
-- requires: table_product
-- requires: table_benchmark
-- requires: table_form_result
-- requires: table_application_status

begin;

create or replace function ggircs_portal.insert_dummy_application_data()
  returns void
  as $function$

  insert into ggircs_portal.product(name, units, state) values ('Flaring, Venting, Fugitives, others', 'm3', 'active'), ('Sales Compression', 'm3', 'active'), ('Dehydration', 'kl', 'active'), ('Inlet Compression', 't', 'active');
  insert into ggircs_portal.benchmark(product_id, benchmark, eligibility_threshold, start_date) values (1, 600, 1500, '2019-09-17 14:49:54.191757-07'), (2, 200, 1000,'2019-09-17 14:49:54.191757-07'), (3, 1200, 5000,'2019-09-17 14:49:54.191757-07'), (4, 5000, 20000,'2019-09-17 14:49:54.191757-07');
  insert into ggircs_portal.application(facility_id) values (1),(2);
  insert into ggircs_portal.form_result(form_id, user_id, application_id, submission_date, form_result)
  values
  (3,2,1, '2019-09-17 14:49:54.191757-07', '{"fuels": [{"quantity": 60, "fuelType": "combusted natural gas", "fuelUnits": "m3", "description": "Nulla duis distincti", "methodology": "wci 2.0"}]}'),
  (6,2,1, '2019-09-17 14:49:54.191757-07', '{"certifiyingOfficial": [{"fax": "+1 (827) 924-9225", "date": "1970-08-01", "phone": "+1 (248) 456-1467", "position": "Tempora ratione dolo", "lastName": "Dolore nulla unde te", "firstName": "Quasi voluptas atque", "emailAddress": "zyqowoc@mailinator.net", "certifierName": "Voluptatibus dolor i", "mailingAddressCity": "Beatae elit veritat", "mailingAddress": "Numquam reiciendis s", "mailingAddressProvince": "New Brunswick", "mailingAddressPostalCode": "h0h0h0"}]}'),
  (4,2,1, '2019-09-17 14:49:54.191757-07', '{"electricityAndHeat": [{"heat": [{"sold": 18, "quantity": 6, "description": 3, "consumedOnsite": 40, "generatedOnsite": 72}], "electricity": [{"sold": 65, "quantity": 51, "description": 23, "consumedOnsite": 97, "generatedOnsite": 2}]}]}'),
  (1,2,1, '2019-09-17 14:49:54.191757-07', '{"facilityInformation": [{"bcghgid": 12111130276, "latitude": 25, "longitude": 70, "naicsCode": 89, "nearestCity": "Aperiam et explicabo", "facilityName": "Nisi facere laborios", "facilityType": "IF_b", "facilityDescription": "Nostrud et veniam s", "mailingAddressCity": "In mollit reprehende", "mailingAddress": "Reprehenderit exerci", "mailingAddressProvince": "British Columbia", "mailingAddressPostalCode": "h0h0h0"}]}'),
  (1,2,1, '2019-09-17 14:49:54.191757-07', '{"reportingOperationInformation": [{"naicsCode": 20, "dunsNumber": 61, "operatorName": "Excepteur occaecat m", "operatorTradeName": "Voluptate qui labori", "mailingAddressCity": "Nihil quibusdam prov", "mailingAddress": "Labore ullam quo est", "mailingAddressCountry": "Consequuntur est et", "mailingAddressProvince": "British Columbia", "mailingAddressPostalCode": "h0h0h0", "bcCorporateRegistryNumber": 52}]}'),
  (5,2,1, '2019-09-17 14:49:54.191757-07', '{"moduleThroughputAndProductionData": [{"units": "kl", "comments": "Aute consequatur Vo", "quantity": 4100, "processingUnit": "Dehydration", "associatedEmissions": "Pariatur Magnam vel", "attributableFuelPercentage": 89}]}'),
  (1,2,1, '2019-09-17 14:49:54.191757-07', '{"operationalRepresentativeInformation": [{"fax": "+1 (303) 934-2116", "phone": "+1 (911) 413-8728", "position": "Amet et et assumend", "lastName": "Eius harum consequat", "firstName": "Et expedita accusant", "emailAddress": "fafolyfew@mailinator.net", "mailingAddressCity": "Quidem et voluptates", "mailingAddress": "Id officia commodi ", "mailingAddressProvince": "British Columbia", "mailingAddressPostalPode": "h0h0h0"}]}'),

  (3,2,2, '2019-09-17 14:49:54.191757-07', '{"fuels": [{"quantity": 85, "fuelType": "diesel", "fuelUnits": "kl", "description": "Dolores fugit atque", "methodology": "wci 3.0"}]}'),
  (6,2,2, '2019-09-17 14:49:54.191757-07', '{"certifiyingOfficial": [{"fax": "+1 (441) 781-8281", "date": "2011-02-18", "phone": "+1 (858) 434-2131", "position": "Veniam minima conse", "lastName": "Culpa duis quo qui e", "firstName": "Quis velit itaque el", "emailAddress": "kykup@mailinator.com", "certifierName": "In voluptatem nisi ", "mailingAddressCity": "Nisi nisi est doloru", "mailingAddress": "Minim ut non expedit", "mailingAddressProvince": "British Columbia", "mailingAddressPostalCode": "h0h0h0"}]}'),
  (4,2,2, '2019-09-17 14:49:54.191757-07', '{"electricityAndKeat": [{"heat": [{"sold": 32, "quantity": 93, "description": 26, "consumedOnsite": 7, "generatedOnsite": 69}], "electricity": [{"sold": 28, "quantity": 71, "description": 8, "consumedOnsite": 9, "generatedOnsite": 75}]}]}'),
  (1,2,2, '2019-09-17 14:49:54.191757-07', '{"facilityInformation": [{"bcghgid": 12111100001, "latitude": 62, "longitude": 7, "naicsCode": 89, "nearestCity": "Delectus exercitati", "facilityName": "Dolor veniam dolore", "facilityType": "IF_b", "facilityDescription": "Provident ut praese", "mailingAddressCity": "Explicabo Irure dol", "mailingAddress": "Quasi aliquid incidu", "mailingAddressProvince": "British Columbia", "mailingAddressPostalCode": "h0h0h0"}]}'),
  (1,2,2, '2019-09-17 14:49:54.191757-07', '{"reportingOperationInformation": [{"naicsCode": 92, "dunsNumber": 75, "operatorName": "Quo qui doloremque b", "operatorTradeName": "Sit dicta aut culpa", "mailingAddressCity": "Aut eum laborum Ut ", "mailingAddress": "Delectus obcaecati ", "mailingAddressCountry": "Minus dolores ration", "mailingAddressProvince": "British Columbia", "mailingAddressPostalCode": "h0h0h0", "bcCorporateRegistry_number": 28}]}'),
  (5,2,2, '2019-09-17 14:49:54.191757-07', '{"moduleThroughputAndProductionData": [{"units": ",m3", "comments": "Mollitia ex non temp", "quantity": 1100, "processingUnit": "Sales Compression", "associatedEmissions": "Molestiae blanditiis", "attributableFuelPercentage": 52}]}'),
  (1,2,2, '2019-09-17 14:49:54.191757-07', '{"operationalRepresentativeInformation": [{"fax": "+1 (403) 112-7963", "phone": "+1 (475) 164-3308", "position": "Culpa officiis liber", "lastName": "Velit facilis offici", "firstName": "Facere nihil minima ", "emailAddress": "mojoqub@mailinator.com", "mailingAddressCity": "Nesciunt et tenetur", "mailingAddress": "Amet optio impedit", "mailingAddressProvince": "British Columbia", "mailingAddressPostalCode": "h0h0h0"}]}');

  insert into ggircs_portal.application_status(application_id, application_status) values (1, 'pending'), (2, 'pending');

    insert into ggircs_portal.fuel(name, units, state) values ('Acetylene','m3', 'active'),
  ('Agricultural Byproducts','t', 'active'),
  ('Anthracite Coal','t', 'active'),
  ('Asphalt & Road Oil','kL', 'active'),
  ('Aviation Gasoline','kL', 'active'),
  ('Aviation Turbo Fuel','kL', 'active'),
  ('Biodiesel (100%)','kL', 'active'),
  ('Biogas (captured methane)','m3', 'active'),
  ('Bituminous Coal','t', 'active'),
  ('Bone char - organics','t', 'active'),
  ('Butane','kL', 'active'),
  ('Butylene','kL', 'active'),
  ('C/D Waste - Plastic','t', 'active'),
  ('C/D Waste - Wood','t', 'active'),
  ('Cloth','t', 'active'),
  ('CNCGs','m3', 'active'),
  ('Coal Coke','t', 'active'),
  ('Coal/PetCoke  blend','t', 'active'),
  ('Coke Oven Gas','m3', 'active'),
  ('Combustible Tall Oil','kL', 'active'),
  ('Crude Oil','kL', 'active'),
  ('Crude Sulfate Turpentine (CST)','kL', 'active'),
  ('Crude Tall Oil (CTO)','kL', 'active'),
  ('Diesel','kL', 'active'),
  ('Digester Gas','m3', 'active'),
  ('Distilate Fuel Oil No.1','kL', 'active'),
  ('Distilate Fuel Oil No.2','kL', 'active'),
  ('Distilate Fuel Oil No.4','kL', 'active'),
  ('DNCGs','m3', 'active'),
  ('Ethane','kL', 'active'),
  ('Ethanol (100%)','kL', 'active'),
  ('Ethylene','kL', 'active'),
  ('E-Waste','t', 'active'),
  ('Explosives','t', 'active'),
  ('Field gas or process vent gas ','m3', 'active'),
  ('Field Gas','m3', 'active'),
  ('Foreign Bituminous Coal','t', 'active'),
  ('Isobutane','kL', 'active'),
  ('Isobutylene','kL', 'active'),
  ('Kerosene','kL', 'active'),
  ('Kerosene-type Jet Fuel','kL', 'active'),
  ('Landfill Gas','m3', 'active'),
  ('Light Fuel Oil','kL', 'active'),
  ('Lignite','t', 'active'),
  ('Liquified Petroleum Gases (LPG)','kL', 'active'),
  ('Lubricants','kL', 'active'),
  ('Motor Gasoline','kL', 'active'),
  ('Motor Gasoline - Off-Road','kL', 'active'),
  ('Municipal Solid Waste - biomass component','t', 'active'),
  ('Municipal Solid Waste - non-biomass component','t', 'active'),
  ('Naphtha','kL', 'active'),
  ('Natural Gasoline','kL', 'active'),
  ('Natural Gas','m3', 'active'),
  ('Nitrous Oxide','m3', 'active'),
  ('Peat','t', 'active'),
  ('PEF','t', 'active'),
  ('Petrochemical Feedstocks','kL', 'active'),
  ('Petroleum Coke','kL', 'active'),
  ('Petroleum Coke - Refinery Use','kL', 'active'),
  ('Plastic','t', 'active'),
  ('Propane','kL', 'active'),
  ('Propylene','kL', 'active'),
  ('Refinery Fuel Gas','m3', 'active'),
  ('Rendered Animal Fat','kL', 'active'),
  ('Residual Fuel Oil (#5 & 6)','kL', 'active'),
  ('RFG - Mix Drum','m3', 'active'),
  ('RFG - Reformer Gas','m3', 'active'),
  ('Roofing Tear-off','t', 'active'),
  ('SMR PSA Tail Gas','m3', 'active'),
  ('Sodium Bicarbonate','t', 'active'),
  ('Solid Byproducts','t', 'active'),
  ('Spent Pulping Liquor','t', 'active'),
  ('Still Gas - Refineries','m3', 'active'),
  ('Still Gas','m3', 'active'),
  ('Sub-Bituminous Coal','t', 'active'),
  ('Tail Gas','m3', 'active'),
  ('Tall Oil','kL', 'active'),
  ('Tires - biomass component','t', 'active'),
  ('Tires - non-biomass component','t', 'active'),
  ('Trona','t', 'active'),
  ('Turpentine','kL', 'active'),
  ('Vegetable Oil','kL', 'active'),
  ('Waste Oil','kL', 'active'),
  ('Wood Waste','t', 'active'),
  ('Flared Natural Gas CO2','m3', 'active'),
  ('Flared Natural Gas CH4','m3', 'active'),
  ('Flared Natural Gas N20','m3', 'active'),
  ('Vented Natural Gas','m3', 'active');

  $function$
  language sql;

select ggircs_portal.insert_dummy_application_data();
commit;
