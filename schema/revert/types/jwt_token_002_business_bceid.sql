-- Revert ggircs-portal:types/jwt_token_002_business_bceid from pg

begin;

alter type ggircs_portal.jwt_token drop attribute bceid_business_name;

commit;
