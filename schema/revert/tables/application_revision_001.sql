-- Revert ggircs-portal:tables/application_revision_001 from pg

begin;

alter table ggircs_portal.application_revision drop column override_justification;

commit;
