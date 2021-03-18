-- Deploy ggircs-portal:mutations/create_fuel_naics_mutation to pg
-- requires: tables/fuel_naics

begin;

create or replace function ggircs_portal.create_fuel_naics_mutation(
  fuel_id_input int,
  naics_id_input int
) returns void as $function$

  -- Reset deleted at/by and update description on conflict
  insert into ggircs_portal.fuel_naics(fuel_id, naics_id)
  values (fuel_id_input, naics_id_input)
  on conflict(fuel_id, naics_id) do update set deleted_at=null, deleted_by=null;

$function$ language sql volatile;

grant execute on function ggircs_portal.create_fuel_naics_mutation to ciip_administrator;
comment on function ggircs_portal.create_fuel_naics_mutation is 'This custom create mutation does an upsert on conflict of the fuel_id & naics_id columns, setting the deleted at/by columsn to null';

commit;
