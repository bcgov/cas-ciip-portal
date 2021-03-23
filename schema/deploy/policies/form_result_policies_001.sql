-- Deploy ggircs-portal:policies/form_result_policies_001 to pg
-- requires: policies/form_result_policies

BEGIN;

drop policy certifier_select_form_result on ggircs_portal.form_result;

COMMIT;
