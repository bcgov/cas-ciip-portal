-- Deploy ggircs-portal:function_application_swrs_operator_contact_data to pg
-- requires: table_application
-- requires: function_get_swrs_operator_contact_data

begin;

  create or replace function ggircs_portal.application_swrs_operator_contact_data(
    application ggircs_portal.application,
    reporting_year varchar(1000)
  )
  returns setof ggircs_portal.operator_contact_data
  as
  $body$
    declare
    begin
        return query (
            select * from ggircs_portal.get_swrs_operator_contact_data(
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
