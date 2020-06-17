begin;

-- Explicitly disable triggers not needed in this test and enable ones that are needed:
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_access_approved_email;

-- Sets up test organisation to which access can be requested:
delete from ggircs_portal.organisation where id = 100;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (100, 'MacDonalds Agriculture, Ltd.');

delete from ggircs_portal.ciip_user_organisation where user_id = 6 and organisation_id = 100;

commit;
