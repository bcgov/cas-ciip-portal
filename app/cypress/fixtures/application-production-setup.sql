begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');

commit;
