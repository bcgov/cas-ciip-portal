-- Verify ggircs-portal:computed_columns/certification_url_hash_matches on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal.certification_url_hash_matches');

rollback;
