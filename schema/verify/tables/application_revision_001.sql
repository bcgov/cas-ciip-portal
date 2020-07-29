-- Verify ggircs-portal:tables/application_revision_001 on pg

begin;

select column_name
from information_schema.columns
where table_schema='ggircs_portal' and table_name='application_revision' and column_name='override_justification';

rollback;
