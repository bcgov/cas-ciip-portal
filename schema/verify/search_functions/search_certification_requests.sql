-- Verify ggircs-portal:search_functions/search_certification_url on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal.search_certification_requests');

rollback;
