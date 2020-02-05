begin;

update ggircs_portal.application_revision_status set application_revision_status = 'draft' where application_id=2 and version_number=1;
update ggircs_portal.application_revision set legal_disclaimer_accepted = false, certification_signature = null where application_id=2 and version_number=1;
delete from ggircs_portal.certification_url where application_id=2;
enable trigger _random_id;

commit;
