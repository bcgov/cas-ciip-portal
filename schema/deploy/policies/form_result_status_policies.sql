-- Deploy ggircs-portal:policies/form_result_status_policies to pg
-- requires: tables/form_result_status

begin;

drop function ggircs_portal_private.get_valid_form_result_status_applications cascade;

commit;
