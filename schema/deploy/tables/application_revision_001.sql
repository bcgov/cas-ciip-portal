-- Deploy ggircs-portal:tables/application_revision_001 to pg
-- requires: tables/application_revision

begin;

alter table ggircs_portal.application_revision add column override_justification varchar(10000) default '';

comment on column ggircs_portal.application_revision.override_justification is 'Reporter defined justification for overriding error validation when submitting this revision';

commit;
