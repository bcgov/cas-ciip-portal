-- Deploy ggircs-portal:type_ciip_application_revision_status to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.ciip_application_revision_status as enum ('pending', 'approved', 'rejected', 'draft', 'requested changes', 'changes submitted');

commit;
