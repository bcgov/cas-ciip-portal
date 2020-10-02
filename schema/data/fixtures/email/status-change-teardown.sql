begin;

select test_helper.modify_triggers('enable');

delete from ggircs_portal.certification_url where application_id=1;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=100;
delete from ggircs_portal.form_result_status where application_id=1;
delete from ggircs_portal.form_result where application_id=1;
delete from ggircs_portal.application_revision_status where application_id=1;
delete from ggircs_portal.application_revision where application_id=1;
delete from ggircs_portal.application where id=1;

delete from ggircs_portal.facility where id=100;
delete from ggircs_portal.organisation where id=100;

commit;
