-- Deploy ggircs-portal:types/review_comment_type to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.review_comment_type as enum ('general', 'internal', 'requested change');

commit;
