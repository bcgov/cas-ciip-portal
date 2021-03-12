-- Verify ggircs-portal:function_ciip_user_certification_requests on pg

BEGIN;

select ggircs_portal_private.verify_function_not_present('ggircs_portal.ciip_user_has_certification_requests');

ROLLBACK;
