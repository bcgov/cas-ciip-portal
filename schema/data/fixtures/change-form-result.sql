-- change form result data so that the 'Data has changed' errors will show up

begin;

update ggircs_portal.form_result set form_result = '{
"facility": {
  "naics": "123456",
  "bcghgid": "123465",
  "facilityName": "test",
  "facilityType": "L_c",
  "mailingAddress": {
    "city": "Victoria",
    "province": "British Columbia",
    "streetAddress": "123 street st",
    "postalCode": "H0H0H0"
  },
  "isFacilityLocationDifferent": false
},
"operator": {
  "name": "Changed",
  "naics": "12345",
  "tradeName": "trade",
  "bcCorporateRegistryNumber": "nkm8305753",
  "mailingAddress": {
    "city": "Victoria",
    "province": "British Columbia",
    "streetAddress": "123 street st",
    "postalCode": "H0H 0H0"
  }
}, "operationalRepresentative": {
  "firstName": "first",
  "lastName": "last",
  "email": "first@last.com",
  "phone": "2509991234",
  "position": "CEO",
  "mailingAddress": {
    "city": "Victoria",
    "province": "British Columbia",
    "streetAddress": "123 street st",
    "postalCode": "H0H 0H0"
  }
}
}
'
  where application_id=2 and version_number=1 and form_id=1;

commit;
