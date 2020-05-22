-- Revert ggircs-portal:types/search_certification_url_result from pg

begin;

drop type ggircs_portal.search_certification_url_result;

commit;
