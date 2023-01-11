-- Revert ggircs-portal:type_jwt_token from pg

begin;

drop type ggircs_portal.jwt_token;

commit;
