-- Fixture for Cypress test form-errors-prevent-submit

begin;

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
update ggircs_portal.application_revision set legal_disclaimer_accepted = false where application_id=2 and version_number=1;

commit;
