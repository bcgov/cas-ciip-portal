-- Verify ggircs-portal:tables/application_review_step_001 on pg

begin;

do
$do$
  begin

    if (select exists(
      select * from ggircs_portal.application_review_step
      where review_step_id > 1
      and application_id in (select id from ggircs_portal.application where reporting_year = 2018)))
    then
      raise exception 'There are non-legacy review steps present on legacy applications';
    else
      perform true;
    end if;

  end
$do$;

rollback;
