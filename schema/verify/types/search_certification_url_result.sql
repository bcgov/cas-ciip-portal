-- Verify ggircs-portal:types/search_certification_url_result on pg

begin;

select ggircs_portal_private.verify_type_not_present('search_certification_url_result');

rollback;
