-- Deploy ggircs-portal:database_functions/get_valid_applications_for_certifier to pg
-- requires: tables/certification_url

begin;

  drop function ggircs_portal_private.get_valid_applications_for_certifier;

commit;
