begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
update ggircs_portal.application_revision set legal_disclaimer_accepted=true where application_id=2 and version_number=1;

commit;
