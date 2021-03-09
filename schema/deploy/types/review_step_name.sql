-- Deploy ggircs-portal:types/review_step_name to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.review_step_name as enum ('administrative', 'technical', 'legacy');

commit;
