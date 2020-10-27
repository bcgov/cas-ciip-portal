-- Add a user to the database (triggers welcome email)

begin;
select test_helper.modify_triggers('enable');
insert into ggircs_portal.ciip_user(uuid, first_name, last_name, email_address)
values ('00000000-0000-0000-0000-000000000001', 'Cypress', 'AddedMe', 'newcypressuser@user.us');

commit;
