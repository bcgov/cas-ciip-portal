-- Revert ggircs-portal:trigger_functions/immutable-form-result from pg

begin;

drop function ggircs_portal_private.immutable_form_result;

commit;
