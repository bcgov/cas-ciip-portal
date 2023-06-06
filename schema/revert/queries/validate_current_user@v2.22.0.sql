-- Revert ggircs-portal:queries/validate_current_user from pg

begin;

drop function ggircs_portal.validate_current_user();

commit;
