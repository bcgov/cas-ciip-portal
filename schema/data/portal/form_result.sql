 begin;

with rows as (
insert into ggircs_portal.form_result
(id, form_id, user_id, application_id, submission_date, form_result)
overriding system value
values
  (1,1,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (2,2,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (3,3,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (4,4,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (5,5,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (6,6,2,1, '2019-09-17 14:49:54.191757-07', '{}'),

  (8,1,2,2, '2019-09-17 14:49:54.191757-07', '{"facilityInformation": [{"bcghgid": 66, "latitude": 97, "longitude": 2, "naicsCode": 13, "facilityName": "Dolor deleniti numqu", "facilityType": "EIO", "mailingAddress": "Aliqua Praesentium ", "mailingAddressCity": "Commodo voluptatibus", "facilityDescription": "Omnis deleniti hic m", "mailingAddressProvince": "Newfoundland and Labrador", "mailingAddressPostalCode": "h0h0h0"}], "reportingOperationInformation": [{"duns": 3, "naicsCode": 94, "operatorName": "Magnam est ut rerum ", "mailingAddress": "Quia iusto ipsum nat", "operatorTradeName": "Ad laboris ut odit p", "mailingAddressCity": "Voluptatum consectet", "mailingAddressCountry": "Enim sint quis neces", "mailingAddressProvince": "Manitoba", "mailingAddressPostalCode": "h0h0h0", "bcCorporateRegistryNumber": 25}], "operationalRepresentativeInformation": [{"fax": "+1 (363) 803-2646", "phone": "+1 (422) 769-1088", "lastName": "Dolorem delectus re", "position": "Non consequuntur est", "firstName": "Eos illo tempora te", "emailAddress": "kype@mailinator.net", "mailingAddress": "Nihil fugiat alias a", "mailingAddressCity": "Iure veritatis conse", "mailingAddressProvince": "Alberta", "mailingAddressPostalCode": "h0h0h0"}]}'),
  (9,2,2,2, '2019-09-17 14:49:54.191757-07', '{"Flaring": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 1625, "annualEmission": 65}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 37, "annualEmission": 37}]}], "Venting": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 2050, "annualEmission": 82}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 53, "annualEmission": 53}]}], "Fugitive": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 1800, "annualEmission": 72}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 4, "annualEmission": 4}]}]}'),
  (10,3,2,2, '2019-09-17 14:49:54.191757-07', '{"fuels": [{"fuelType": "C/D Waste - Plastic", "quantity": 4, "fuelUnits": "t", "description": "Itaque neque magnam ", "methodology": "wci 1.0"}]}'),
  (11,4,2,2, '2019-09-17 14:49:54.191757-07', '{"electricityAndHeat": [{"heat": [{"sold": 81, "quantity": 96, "description": 29, "consumedOnsite": 54, "generatedOnsite": 44}], "electricity": [{"sold": 57, "quantity": 28, "description": 22, "consumedOnsite": 87, "generatedOnsite": 66}]}]}'),
  (12,5,2,2, '2019-09-17 14:49:54.191757-07', '{"moduleThroughputAndProductionData": [{"product": "Dehydration", "comments": "Saepe quis aliquid e", "quantity": 84, "productUnits": "kl", "associatedEmissions": 42}]}'),
  (13,6,2,2, '2019-09-17 14:49:54.191757-07', '{"certifyingOfficial": [{"fax": "+1 (585) 931-4154", "date": "2009-07-19", "phone": "+1 (681) 476-7654", "lastName": "Eveniet tempora ad ", "position": "Culpa enim tempor id", "firstName": "Suscipit asperiores ", "emailAddress": "towun@mailinator.net", "certifierName": "Esse dicta et magni", "mailingAddressCity": "Nulla libero harum e", "mailingAddressLine1": "Ratione occaecat et ", "mailingAddressProvince": "Quebec", "mailingAddressPostalCode": "h0h0h0"}]}')
on conflict(id) do update set
form_id=excluded.form_id,
user_id=excluded.user_id,
application_id=excluded.application_id,
submission_date=excluded.submission_date,
form_result=excluded.form_result
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.form_result' from rows;

select setval from
setval('ggircs_portal.form_result_id_seq', (select max(id) from ggircs_portal.form_result), true)
where setval = 0;

commit;
