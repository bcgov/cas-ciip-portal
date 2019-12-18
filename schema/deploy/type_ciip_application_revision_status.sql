-- Deploy ggircs-portal:type_ciip_application_revision_status to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.ciip_application_revision_status as enum ('submitted', 'approved', 'rejected', 'draft', 'requested changes');

commit;
