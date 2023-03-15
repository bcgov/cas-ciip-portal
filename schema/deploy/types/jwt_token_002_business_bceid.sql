-- Deploy ggircs-portal:types/jwt_token_002_business_bceid to pg
-- requires: types/jwt_token_001_sub_is_text

begin;

alter type ggircs_portal.jwt_token add attribute bceid_business_name type text;

commit;
