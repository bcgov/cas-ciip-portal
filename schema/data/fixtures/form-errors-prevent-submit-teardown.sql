begin;

alter table ggircs_portal.application_revision_status
  enable trigger _status_change_email;
update ggircs_portal.application_revision set legal_disclaimer_accepted = false where application_id=2 and version_number=1;

commit;
