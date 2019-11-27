-- Revert ggircs-portal:type_application_review_status from pg

begin;

drop type ggircs_portal.application_review_status;

commit;
