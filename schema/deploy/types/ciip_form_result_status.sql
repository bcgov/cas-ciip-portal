-- Deploy ggircs-portal:types/ciip_form_result_status to pg
-- requires: schema_ggircs_portal

begin;

drop type ggircs_portal.ciip_form_result_status;

commit;
