-- Deploy ggircs-portal:trigger_functions/draft_application_started to pg
-- requires: schema_ggircs_portal

begin;

drop function if exists ggircs_portal_private.draft_application_started;

commit;
