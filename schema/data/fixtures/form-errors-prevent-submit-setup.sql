-- Fixture for cypress test form-errors-prevent-submit

begin;

-- Add approved user - organisation connection for applicaiton id=2
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
-- set legal_disclaimer_accepted = true so we can bypass having to check all the legal boxes & skip to the summary page
update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=2 and version_number=1;

commit;
