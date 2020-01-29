-- Revert ggircs-portal:database_functions/upsert_policy from pg

begin;

drop function ggircs_portal.upsert_policy(text, text, text, text, text);
drop function ggircs_portal.upsert_policy(text, text, text, text, text, text);

commit;
