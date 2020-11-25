-- Verify ggircs-portal:tables/reporting_year_001 on pg

begin;

select exists (select tgname
from pg_trigger
where not tgisinternal
and tgrelid = 'ggircs_portal.reporting_year'::regclass
and tgname = '_protect_date_overlap');

rollback;
