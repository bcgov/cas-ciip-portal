-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- create 'submitted' applications for the analyst to view & diff
-- edit form results for versions 1&2 for diffing

begin;

select test_helper.modify_triggers('disable');

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
select ggircs_portal.create_application_revision_mutation_chain(1,1);
update ggircs_portal.certification_url set certification_signature = 'signed' where application_id=1;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1,1,'submitted');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1,2,'submitted');

select test_helper.initialize_all_form_result_data(application_id => 1, version_number => 1, seed => 0);
select test_helper.initialize_all_form_result_data(application_id => 1, version_number => 2, seed => 5);

commit;
