begin;

set client_min_messages to warning;
create extension if not exists pgtap;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;


select no_plan();

set jwt.claims.sub to 'whoathisisastrangeuuid@testing_idp';
set jwt.claims.email to 'test@example.com';


-- returns true if the user is not in the database (new user)
select is(
    (select ggircs_portal.validate_current_user()),
    false,
    'returns true if the user is not in the database (new user)'
);

-- returns true if the user is in the database with the same uuid as the session
insert into ggircs_portal.ciip_user (uuid, email_address) values ('whoathisisastrangeuuid@testing_idp','test@example.com');

select is(
    (select ggircs_portal.validate_current_user()),
    true,
    'returns true if the user is not in the database (new user)'
);


-- returns true if the user is in the database with a different uuid but the allow_uuid_update flag set to true (returning user after KC gold migration)


-- returns false if the user is in the database, different uuid and allow_uuid_update set to false (new account with same email)




select finish();

rollback;
