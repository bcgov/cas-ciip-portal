-- Deploy ggircs-portal:types/search_certification_url_result to pg
-- requires: schema_ggircs_portal

begin;

drop type ggircs_portal.search_certification_url_result;

commit;
