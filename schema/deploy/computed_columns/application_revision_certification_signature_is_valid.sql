-- Deploy ggircs-portal:computed_columns/application_revision_certification_signature_is_valid to pg
-- requires: tables/application_revision
-- requires: function_current_form_result_md5

begin;

drop function ggircs_portal.application_revision_certification_signature_is_valid;

commit;
