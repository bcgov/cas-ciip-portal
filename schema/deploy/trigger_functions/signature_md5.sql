-- Deploy ggircs-portal:trigger_functions/signature_md5 to pg
-- requires: schema_ggircs_portal_private

begin;

  drop function ggircs_portal_private.signature_md5;

commit;
