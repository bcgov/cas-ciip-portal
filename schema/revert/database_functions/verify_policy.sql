-- Revert ggircs-portal:database_functions/verify_policy from pg

begin;

drop function ggircs_portal.verify_policy(text, text, text, text);

commit;
