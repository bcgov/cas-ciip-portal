-- Deploy ggircs-portal:schema_ggircs_portal_private to pg

begin;

create schema ggircs_portal_private;
comment on schema ggircs_portal_private is 'A private schema for the GGIRCS Industry Portal containing db entities that should not be exposed via the public API.';

commit;
