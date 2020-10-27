begin;

insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (2,1, 'draft');
update ggircs_portal.application_revision set legal_disclaimer_accepted = false where application_id=2 and version_number=1;
delete from ggircs_portal.certification_url where application_id=2;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;

select test_helper.modify_triggers('enable');

commit;
