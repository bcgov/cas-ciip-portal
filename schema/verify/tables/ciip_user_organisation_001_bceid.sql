-- Verify ggircs-portal:tables/ciip_user_organisation_001_bceid on pg

begin;

select column_name
from information_schema.columns
where table_schema='ggircs_portal' and table_name='ciip_user_organisation' and column_name='bceid_business_name';

rollback;
