-- Deploy ggircs-portal:computed_columns/application_revision_certification_url to pg
-- requires: tables/certification_url

begin;

drop function ggircs_portal.application_revision_certification_url;

commit;
