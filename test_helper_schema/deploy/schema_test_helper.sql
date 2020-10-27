-- Deploy test_helpers:schema_test_helper to pg

begin;

create schema test_helper;
comment on schema ggircs_portal is 'A schema for helper functions associated with pgTap & e2e tests';

commit;
