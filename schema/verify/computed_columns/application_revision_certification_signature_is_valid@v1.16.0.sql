-- Verify ggircs-portal:computed_columns/application_revision_certification_signature_is_valid on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_certification_signature_is_valid(ggircs_portal.application_revision)'::regprocedure);

rollback;
