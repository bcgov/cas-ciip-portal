begin;

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _set_user_id;

commit;
