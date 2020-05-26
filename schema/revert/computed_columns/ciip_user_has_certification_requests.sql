-- Revert ggircs-portal:function_ciip_user_certification_requests from pg

BEGIN;

drop function ggircs_portal.ciip_user_has_certification_requests;

COMMIT;
