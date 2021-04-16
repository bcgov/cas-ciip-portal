-- Deploy ggircs-portal:queries/default_displayed_reporting_year to pg

begin;


create or replace function ggircs_portal.default_displayed_reporting_year()
  returns ggircs_portal.reporting_year
  as $$
    (
      select * from ggircs_portal.opened_reporting_year()
    )
    union
    -- The latest reporting year that is already closed
    (
      select * from ggircs_portal.reporting_year
      where
      reporting_year = (select max(reporting_year) from ggircs_portal.reporting_year where now() > application_close_time)
      and (select reporting_year from ggircs_portal.opened_reporting_year()) is null
    );
  $$ language 'sql' stable;

grant execute on function ggircs_portal.default_displayed_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
