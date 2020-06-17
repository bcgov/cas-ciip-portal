begin;

update ggircs_portal.ciip_user_organisation set status = 'approved' where user_id = 6 and organisation_id = 100;

commit;
