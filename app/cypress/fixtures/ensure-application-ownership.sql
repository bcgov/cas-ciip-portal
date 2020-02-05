
-- Ensures that the cypress_test_reporter has access to the necessary organisation in order to run the application-production.spec test
begin;

insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');

commit;
