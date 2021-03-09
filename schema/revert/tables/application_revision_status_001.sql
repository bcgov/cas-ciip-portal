-- Revert ggircs-portal:tables/application_revision_status_001 from pg

begin;

create trigger _check_certification_signature_md5
    before insert on ggircs_portal.application_revision_status
    for each row
    execute procedure ggircs_portal_private.signature_md5('submission');

commit;
