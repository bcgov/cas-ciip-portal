begin;

update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=2 and version_number=1;

commit;
