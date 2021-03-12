-- Verify ggircs-portal:computed_columns/certification_url_hash_matches on pg

begin;

select pg_get_functiondef('ggircs_portal.certification_url_hash_matches(ggircs_portal.certification_url)'::regprocedure);

rollback;
