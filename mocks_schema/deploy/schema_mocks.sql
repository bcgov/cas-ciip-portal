-- Deploy mocks:schema_mocks to pg

BEGIN;

create schema mocks;
grant usage on schema mocks to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on schema mocks is 'A schema for mock functions that can be used for either tests or dev/test environments';

COMMIT;
