-- Revert ggircs-portal:search_functions/search_certification_request from pg

begin;

drop function ggircs_portal.search_certification_requests;

commit;
