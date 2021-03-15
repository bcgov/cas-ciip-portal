-- Verify ggircs-portal:trigger_functions/signature_md5 on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal_private.signature_md5');

rollback;
