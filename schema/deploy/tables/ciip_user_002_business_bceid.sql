-- Deploy ggircs-portal:tables/ciip_user_002_business_bceid to pg
-- requires: tables/ciip_user_001_uuid_is_varchar

begin;

-- Add bceid_business_name colummn
alter table ggircs_portal.ciip_user add column bceid_business_name varchar(1000);

-- Email is no longer changeable since it's the identifier for the account
grant update (bceid_business_name) on ggircs_portal.ciip_user to ciip_administrator;
grant update (bceid_business_name) on ggircs_portal.ciip_user to ciip_analyst;
grant update (bceid_business_name) on ggircs_portal.ciip_user to ciip_industry_user;

-- Remove unique index on email_address
drop index ggircs_portal.user_email_address_uindex;

-- Add unique index on email_address + bceid_business_name (one email per business_bceid + one allowable basic bceid)
create unique index user_email_bceid_uindex
  on ggircs_portal.ciip_user(email_address, coalesce(bceid_business_name, ''));


commit;
