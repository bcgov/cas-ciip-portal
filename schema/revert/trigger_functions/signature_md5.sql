-- Revert ggircs-portal:trigger_functions/signature_md5 from pg

begin;

drop function ggircs_portal_private.signature_md5;

commit;
