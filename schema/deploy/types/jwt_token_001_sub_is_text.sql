-- Deploy ggircs-portal:type_jwt_token to pg
-- requires: schema_ggircs_portal

begin;

alter type ggircs_portal.jwt_token alter attribute sub type text;

commit;
