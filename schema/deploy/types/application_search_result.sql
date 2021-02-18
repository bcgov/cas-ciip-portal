-- Deploy ggircs-portal:type_application_search_result to pg
-- requires: schema_ggircs_portal

begin;

drop type ggircs_portal.application_search_result;

commit;
