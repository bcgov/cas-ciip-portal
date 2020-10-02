begin;

-- Explicitly disable triggers not needed in this test and enable ones that are needed:
select test_helper.modify_triggers('enable');
select test_helper.modify_triggers('disable','{
  "ciip_user_organisation":["_set_user_id"]
}');


-- Sets up test organisation to which access can be requested:
delete from ggircs_portal.organisation where id = 100;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (100, 'MacDonalds Agriculture, Ltd.');

delete from ggircs_portal.ciip_user_organisation where user_id = 6 and organisation_id = 100;

commit;
