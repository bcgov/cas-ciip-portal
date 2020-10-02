begin;

select test_helper.modify_triggers('enable');

delete from ggircs_portal.ciip_user_organisation where user_id = 6 and organisation_id = 100;
delete from ggircs_portal.organisation where id = 100;

commit;
