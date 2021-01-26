-- Verify ggircs-portal:tables/ciip_application_wizard_001 on pg

begin;

select column_name
from information_schema.columns
where table_schema='ggircs_portal' and table_name='ciip_application_wizard' and column_name='is_active';

rollback;
