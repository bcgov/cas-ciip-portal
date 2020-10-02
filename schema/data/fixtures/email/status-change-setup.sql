begin;

delete from ggircs_portal.certification_url where application_id=1;

select test_helper.modify_triggers('enable');
select test_helper.modify_triggers('disable','{
  "ciip_user_organisation" : ["_set_user_id","_send_request_for_access_email","_send_access_approved_email"],
  "certification_url" : ["_certification_request_email", "_signed_by_certifier_email"],
  "application" : ["_send_draft_application_email"]
}');


delete from ggircs_portal.organisation where id=100;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (100, 'MacDonalds Agriculture, Ltd.');

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=100;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 100, 'approved');

delete from ggircs_portal.facility where id=100;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (100, 100, 'Farm');

truncate ggircs_portal.application restart identity cascade;

select ggircs_portal.create_application_mutation_chain(100);

update ggircs_portal.application_revision_status set created_by = 6 where application_id=1;
update ggircs_portal.application_revision set created_by = 6 where application_id=1;
update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id=1;

commit;
