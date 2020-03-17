-- disable _set_user_id trigger so a value can be inserted in the ciip_user_organisation table
-- insert an 'approved' row in ciip_user_organisation so our cypress_test_reporter has access the the application we are testing (id=2)
-- refresh application data with truncate & create_application_mutation_chain
-- set legal_disclaimer_accepted=true so we can bypass the legal checkboxes & go right to the summary page

begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=2 and version_number=1;
update ggircs_portal.form_result set form_result = '{}'
  where application_id=2 and version_number=1 and form_id=1;

commit;
