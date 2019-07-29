-- Deploy ggircs-portal:schema_ggircs_portal to pg

begin;

create schema ggircs_portal;
comment on schema ggircs_portal is 'A schema for the GGIRCS Industry Portal where Industry Users can apply for, manage, and track their CIIP applications.';

commit;
