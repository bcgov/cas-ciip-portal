-- Deploy ggircs-portal:function_application_swrs_organisation_data to pg
-- requires: table_application
-- requires: function_get_swrs_organisation_data

begin;

  create or replace function ggircs_portal.application_swrs_organisation_data(
    application ggircs_portal.application,
    reporting_year varchar(1000)
  )
  returns ggircs_portal.organisation_data
  as
  $body$
    declare
    begin
        return (
            select ggircs_portal.get_swrs_organisation_data(
               (
                   select swrs_facility_id
                   from ggircs_portal.facility
                   where id = application.facility_id
               ),
               reporting_year
           )
        );
    end;
  $body$
  language 'plpgsql' stable;
commit;
