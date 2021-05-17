-- Deploy ggircs-portal:tables/application_005 to pg
-- requires: tables/application_004

begin;

-- Remove the email sent to a user on starting a draft application
drop trigger if exists _send_draft_application_email on ggircs_portal.application;

commit;
