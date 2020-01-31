-- Revert ggircs-portal:database_functions/verify_grants from pg

begin;

drop function ggircs_portal.verify_grant(text, text, text);
drop function ggircs_portal.verify_grant(text, text, text, text[]);

commit;
