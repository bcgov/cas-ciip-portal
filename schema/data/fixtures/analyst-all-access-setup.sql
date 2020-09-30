-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- create a 'submitted' application for the analyst to view

begin;

select test_helper.modify_triggers('disable');

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
update ggircs_portal.certification_url set certification_signature = 'signed' where application_id=2;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (2,1,'submitted');

commit;
