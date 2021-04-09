-- Deploy ggircs-portal:computed_columns/application_revision_ordered_form_results to pg

begin;

create or replace function ggircs_portal.application_revision_ordered_form_results(application_revision ggircs_portal.application_revision)
returns setof ggircs_portal.form_result
as
$$
  select form_result.* from ggircs_portal.form_result
    join ggircs_portal.ciip_application_wizard as wizard
    on wizard.form_id = form_result.form_id and
      form_result.application_id = application_revision.application_id and
      form_result.version_number = application_revision.version_number
    order by wizard.form_position;
$$
language 'sql' stable;

grant execute on function ggircs_portal.application_revision_ordered_form_results to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_ordered_form_results is 'Returns the form results for this application revision, ordered by the with the order defined by the application wizard';

commit;
