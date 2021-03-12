-- Deploy ggircs-portal:function_ciip_user_certification_requests to pg
-- requires: table_ciip_user
-- requires: table_certification_url
-- requires: table_application

begin;

drop function ggircs_portal.ciip_user_has_certification_requests;

commit;
