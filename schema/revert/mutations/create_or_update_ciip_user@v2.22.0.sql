-- Revert ggircs-portal:mutations/create_or_update_ciip_user from pg

begin;

drop function ggircs_portal.create_or_update_ciip_user;

commit;
