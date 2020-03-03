-- Revert ggircs-portal:computed_columns/certification_url_hash_matches from pg

begin;

drop function ggircs_portal.certification_url_hash_matches;

commit;
