-- Deploy ggircs-portal:function_ciip_application_by_row_id to pg
-- requires: view_ciip_application

begin;

create function ggircs_portal.ciip_application_by_row_id(row_id integer)
  returns ggircs_portal.ciip_application
  as $function$

  select * from ggircs_portal.ciip_application where id::int = row_id;

  $function$
  language sql stable;

commit;
