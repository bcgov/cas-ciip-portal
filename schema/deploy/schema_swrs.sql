-- Deploy ggircs-portal:schema_swrs to pg

begin;

create schema if not exists swrs ;
-- This schema will either exist or have a comment imported by pg_restore, so adding a comment here is not neeed
commit;
