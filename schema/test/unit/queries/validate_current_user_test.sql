begin;

set client_min_messages to warning;
create extension if not exists pgtap;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;


select plan(9);

truncate ggircs_portal.ciip_user restart identity cascade;


-- BASIC BCeID tests

set jwt.claims.sub to 'whoathisisastrangeuuid@testing_idp';
set jwt.claims.email to 'test@example.com';


-- returns true if the user is not in the database (new user)
select is(
    (select ggircs_portal.validate_current_user()),
    true,
    'returns true if the user is not in the database (new user)'
);

-- Create a basic bceid user
insert into ggircs_portal.ciip_user (uuid, email_address) values ('whoathisisastrangeuuid@testing_idp','test@example.com');

-- returns true if the user is in the database with the same uuid as the session
select is(
    (select ggircs_portal.validate_current_user()),
    true,
    'returns true if the user is in the database and the uuid matches the session'
);

-- returns true if the user is in the database with a different uuid but the allow_uuid_update flag set to true (returning user after KC gold migration)
update ggircs_portal.ciip_user set allow_uuid_update = true;
set jwt.claims.sub to 'whoathisisastrangeuuid@testing_idp_new';

select is(
    (select ggircs_portal.validate_current_user()),
    true,
    'returns true if the user is in the database with a different uuid but the allow_uuid_update flag set to true'
);

-- returns false if the user is in the database, different uuid, allow_uuid_update set to false (new abasic ccount with same email) and there is no bceid_business_name (Basic BCeID)
update ggircs_portal.ciip_user set allow_uuid_update = false;
select is(
    (select ggircs_portal.validate_current_user()),
    false,
    'returns false if the user is in the database, different uuid, bceid_business_name is null and allow_uuid_update set to false (new account with same email) '
);

-- BUSINESS BCeID tests

set jwt.claims.sub to 'business_bceid@testing_idp';
set jwt.claims.email to 'test@example.com';
set jwt.claims.bceid_business_name to 'business';

-- returns true if the business bceid user is not in the database (new business bceid user)
select is(
    (select ggircs_portal.validate_current_user()),
    true,
    'returns true if there is a basic user in the database when adding a business user with the same email address and a bceid_business_name value'
);

insert into ggircs_portal.ciip_user (uuid, email_address, bceid_business_name) values ('business_bceid@testing_idp','test@example.com', 'business');

set jwt.claims.sub to 'different_business_bceid@testing_idp';
set jwt.claims.bceid_business_name to 'business_different';

select is(
    (select ggircs_portal.validate_current_user()),
    true,
    'returns true if there is a basic and business user in the database that matches the email address, but the business names are all different'
);

insert into ggircs_portal.ciip_user (uuid, email_address, bceid_business_name) values ('another_different_business_bceid@testing_idp','test@example.com', 'business_different');
update ggircs_portal.ciip_user set allow_uuid_update = true where bceid_business_name = 'business_different';

select is(
    (select ggircs_portal.validate_current_user()),
    true,
    'returns true if the user is in the database with the same email and business name and a different uuid but the allow_uuid_update flag set to true'
);

update ggircs_portal.ciip_user set allow_uuid_update = false;
set jwt.claims.sub to 'bad_uuid@testing_idp';
set jwt.claims.email to 'test@example.com';
set jwt.claims.bceid_business_name to 'business';

select is(
    (select ggircs_portal.validate_current_user()),
    false,
    'returns false if the user is in the database with the same email and business name and a different uuid and the allow_uuid_update flag set to false'
);

select is(
  (select count(*) from ggircs_portal.ciip_user where email_address = 'test@example.com')::int,
  3,
  'There are 3 valid user rows with the same email address'
);

select finish();

rollback;
