-- Deploy ggircs-portal:types/ciip_form_result_status to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.ciip_form_result_status as enum ('approved', 'in review', 'changes requested', 'needs attention');

commit;
