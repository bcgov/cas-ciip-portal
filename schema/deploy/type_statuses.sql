-- Deploy ggircs-portal:type_statuses to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.statuses as enum ('pending', 'approved', 'rejected');

commit;
