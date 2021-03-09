-- Deploy ggircs-portal:tables/application_revision_status_001 to pg
-- requires: tables/application_revision_status

begin;

drop trigger _check_certification_signature_md5 on ggircs_portal.application_revision_status;

commit;
