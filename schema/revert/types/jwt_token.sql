-- Deploy ggircs-portal:type_jwt_token to pg
-- requires: schema_ggircs_portal

begin;

alter type ggircs_portal.jwt_token alter attribute sub type uuid;

comment on type ggircs_portal.jwt_token is E'@primaryKey sub\n@foreignKey (sub) references ciip_user (uuid)';

commit;
