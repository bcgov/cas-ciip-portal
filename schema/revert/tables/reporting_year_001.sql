-- Revert ggircs-portal:tables/reporting_year_001 from pg

begin;

drop trigger _protect_date_overlap on ggircs_portal.reporting_year;

commit;
