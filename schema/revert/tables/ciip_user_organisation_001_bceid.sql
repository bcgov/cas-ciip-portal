-- Revert ggircs-portal:tables/ciip_user_organisation_001_bceid from pg

begin;

alter table ggircs_portal.ciip_user_organisation drop column bceid_business_name;

commit;
