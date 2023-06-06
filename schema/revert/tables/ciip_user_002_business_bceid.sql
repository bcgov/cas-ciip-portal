-- Revert ggircs-portal:tables/ciip_user_002_business_bceid from pg

begin;

drop index ggircs_portal.user_email_bceid_uindex;

create unique index user_email_address_uindex
  on ggircs_portal.ciip_user(email_address);

alter table ggircs_portal.ciip_user drop column bceid_business_name;

commit;
