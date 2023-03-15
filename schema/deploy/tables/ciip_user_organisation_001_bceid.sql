-- Deploy ggircs-portal:tables/ciip_user_organisation_001_bceid to pg
-- requires: tables/ciip_user_organisation

begin;

alter table ggircs_portal.ciip_user_organisation add column bceid_business_name varchar(1000);
comment on column ggircs_portal.ciip_user_organisation.bceid_business_name is 'The name of the business associated with the user requesting access as per the returned auth token. Null if user did not use business bceid to log in.';

commit;
