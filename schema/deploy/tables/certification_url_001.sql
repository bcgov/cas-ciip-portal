-- Deploy ggircs-portal:tables/certification_url_001 to pg
-- requires: tables/certification_url

BEGIN;

drop trigger _certification_request_email on ggircs_portal.certification_url;
drop trigger _signed_by_certifier_email on ggircs_portal.certification_url;
drop trigger _recertification_request on ggircs_portal.certification_url;
drop trigger _create_form_result_md5 on ggircs_portal.certification_url;
drop trigger _check_form_result_md5 on ggircs_portal.certification_url;

COMMIT;
