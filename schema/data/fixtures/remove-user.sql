-- remove user created in add-user fixture

begin;

delete from ggircs_portal.ciip_user where email_address = 'newcypressuser@user.us';

commit;
