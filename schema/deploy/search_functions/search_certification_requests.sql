-- Deploy ggircs-portal:search_functions/search_certification_requests to pg
-- requires: tables/certification_url

begin;

drop function ggircs_portal.search_certification_requests;

commit;
