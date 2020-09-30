-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- set legal-disclaimer to true to skip legal checkboxes page

begin;

select test_helper.modify_triggers('disable');

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(2);
update ggircs_portal.application_revision set legal_disclaimer_accepted=true where application_id=1 and version_number=1;

commit;
