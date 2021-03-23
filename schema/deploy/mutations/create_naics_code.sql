-- Deploy ggircs-portal:mutations/create_naics_code to pg
-- requires: tables/naics

begin;

create or replace function ggircs_portal.create_naics_code(
  naics_code_input text,
  ciip_sector_input text,
  naics_description_input text
) returns ggircs_portal.naics_code
as $function$
declare
  new_id int;
  result ggircs_portal.naics_code;
begin

  -- Reset deleted at/by and update description on conflict
  insert into ggircs_portal.naics_code(naics_code, ciip_sector, naics_description)
  values (naics_code_input, ciip_sector_input, naics_description_input)
  on conflict(naics_code)
  do update
  set naics_description=naics_description_input, ciip_sector=ciip_sector_input, deleted_at=null, deleted_by=null
  returning id into new_id;

  select * from ggircs_portal.naics_code where id=new_id into result;
  return result;

end;

$function$ language plpgsql volatile;

grant execute on function ggircs_portal.create_naics_code to ciip_administrator;
comment on function ggircs_portal.create_naics_code is 'This custom create mutation does an upsert on conflict of the naics_code column, updating the description and setting the deleted at/by columsn to null';

commit;
