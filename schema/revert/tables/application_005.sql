-- Revert ggircs-portal:tables/application_005 from pg

begin;

create trigger _send_draft_application_email
  before insert on ggircs_portal.application
  for each row
  execute procedure ggircs_portal_private.draft_application_started();

commit;
