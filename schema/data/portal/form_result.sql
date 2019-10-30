 begin;

with rows as (
insert into ggircs_portal.form_result
(id, form_id, user_id, application_id, submission_date, form_result)
overriding system value
values
  (1,1,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (3,3,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (4,4,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (5,5,2,1, '2019-09-17 14:49:54.191757-07', '{}'),
  (6,6,2,1, '2019-09-17 14:49:54.191757-07', '{}'),

  (8,1,2,2, '2019-09-17 14:49:54.191757-07', '{"facilityInformation": [{"bcghgid": 66, "latitude": 97, "longitude": 2, "naicsCode": 13, "nearestCity": "Quo facilis nobis ne", "facilityName": "Dolor deleniti numqu", "facilityType": "EIO", "mailingAddress": "Aliqua Praesentium ", "mailingAddressCity": "Commodo voluptatibus", "facilityDescription": "Omnis deleniti hic m", "mailingAddressProvince": "Newfoundland and Labrador", "mailingAddressPostalCode": "h0h0h0"}], "reportingOperationInformation": [{"duns": 3, "naicsCode": 94, "operatorName": "Magnam est ut rerum ", "mailingAddress": "Quia iusto ipsum nat", "operatorTradeName": "Ad laboris ut odit p", "mailingAddressCity": "Voluptatum consectet", "mailingAddressCountry": "Enim sint quis neces", "mailingAddressProvince": "Manitoba", "mailingAddressPostalCode": "h0h0h0", "bcCorporateRegistryNumber": 25}], "operationalRepresentativeInformation": [{"fax": "+1 (363) 803-2646", "phone": "+1 (422) 769-1088", "lastName": "Dolorem delectus re", "position": "Non consequuntur est", "firstName": "Eos illo tempora te", "emailAddress": "kype@mailinator.net", "mailingAddress": "Nihil fugiat alias a", "mailingAddressCity": "Iure veritatis conse", "mailingAddressProvince": "Alberta", "mailingAddressPostalCode": "h0h0h0"}]}'),
  (9,2,2,2, '2019-09-17 14:49:54.191757-07', '{"Waste": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 850, "annualEmission": 34}], "N2O": [{"GWP": " x 298 = ", "annualCO2e": 5960, "annualEmission": 20}], "CO2bioC": [{"GWP": " x 1 = ", "annualCO2e": 18, "annualEmission": 18}], "CO2bionC": [{"GWP": " x 1 = ", "annualCO2e": 99, "annualEmission": 99}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 100, "annualEmission": 100}]}], "Flaring": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 1625, "annualEmission": 65}], "N2O": [{"GWP": " x 298 = ", "annualCO2e": 11920, "annualEmission": 40}], "CO2bioC": [{"GWP": " x 1 = ", "annualCO2e": 40, "annualEmission": 40}], "CO2bionC": [{"GWP": " x 1 = ", "annualCO2e": 39, "annualEmission": 39}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 37, "annualEmission": 37}]}], "Venting": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 2050, "annualEmission": 82}], "N2O": [{"GWP": " x 298 = ", "annualCO2e": 17582, "annualEmission": 59}], "CO2bioC": [{"GWP": " x 1 = ", "annualCO2e": 13, "annualEmission": 13}], "CO2bionC": [{"GWP": " x 1 = ", "annualCO2e": 22, "annualEmission": 22}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 53, "annualEmission": 53}]}], "Fugitive": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 1800, "annualEmission": 72}], "N2O": [{"GWP": " x 298 = ", "annualCO2e": 25032, "annualEmission": 84}], "SF6": [{"GWP": " x 22800 = ", "annualCO2e": 228000, "annualEmission": 10}], "CO2bioC": [{"GWP": " x 1 = ", "annualCO2e": 37, "annualEmission": 37}], "CO2bionC": [{"GWP": " x 1 = ", "annualCO2e": 28, "annualEmission": 28}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 4, "annualEmission": 4}], "Perfluoroethane_C2F6": [{"GWP": " x 12200 = ", "annualCO2e": 12200, "annualEmission": 1}], "Perfluoromethane_CF4": [{"GWP": " x 7390 = ", "annualCO2e": 657710, "annualEmission": 89}]}], "Wastewater": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 275, "annualEmission": 11}], "N2O": [{"GWP": " x 298 = ", "annualCO2e": 21456, "annualEmission": 72}], "CO2bioC": [{"GWP": " x 1 = ", "annualCO2e": 72, "annualEmission": 72}], "CO2bionC": [{"GWP": " x 1 = ", "annualCO2e": 9, "annualEmission": 9}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 72, "annualEmission": 72}]}], "OnSiteTransportation": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 1050, "annualEmission": 42}], "N2O": [{"GWP": " x 298 = ", "annualCO2e": 11622, "annualEmission": 39}], "CO2bioC": [{"GWP": " x 1 = ", "annualCO2e": 65, "annualEmission": 65}], "CO2bionC": [{"GWP": " x 1 = ", "annualCO2e": 79, "annualEmission": 79}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 32, "annualEmission": 32}]}], "GeneralStationaryCombustion": [{"CH4": [{"GWP": " x 25 = ", "annualCO2e": 2100, "annualEmission": 84}], "N2O": [{"GWP": " x 298 = ", "annualCO2e": 21158, "annualEmission": 71}], "CO2bioC": [{"GWP": " x 1 = ", "annualCO2e": 36, "annualEmission": 36}], "CO2bionC": [{"GWP": " x 1 = ", "annualCO2e": 82, "annualEmission": 82}], "CO2nonbio": [{"GWP": " x 1 = ", "annualCO2e": 83, "annualEmission": 83}]}]}'),
  (10,3,2,2, '2019-09-17 14:49:54.191757-07', '{"fuels": [{"fuelType": "C/D Waste - Plastic", "quantity": 4, "fuelUnits": "t", "description": "Itaque neque magnam ", "methodology": "wci 1.0"}]}'),
  (11,4,2,2, '2019-09-17 14:49:54.191757-07', '{"electricityAndHeat": [{"heat": [{"sold": 81, "quantity": 96, "description": 29, "consumedOnsite": 54, "generatedOnsite": 44}], "electricity": [{"sold": 57, "quantity": 28, "description": 22, "consumedOnsite": 87, "generatedOnsite": 66}]}]}'),
  (12,5,2,2, '2019-09-17 14:49:54.191757-07', '{"moduleThroughputAndProductionData": [{"product": "Dehydration", "comments": "Saepe quis aliquid e", "quantity": 84, "productUnits": "kl", "associatedEmissions": "Dolor similique volu", "attributableFuelPercentage": 32}]}'),
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
