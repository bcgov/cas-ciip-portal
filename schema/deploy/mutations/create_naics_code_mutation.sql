-- Deploy ggircs-portal:mutations/create_naics_code_mutation to pg
-- requires: tables/naics

begin;

create or replace function ggircs_portal.create_naics_code_mutation(
  naics_code_input text,
  naics_description_input text
) returns void as $function$

  -- Reset deleted at/by and update description on conflict
  insert into ggircs_portal.naics_code(naics_code, naics_description)
  values (naics_code_input, naics_description_input)
  on conflict(naics_code) do update set naics_description=naics_description_input, deleted_at=null, deleted_by=null;

$function$ language sql volatile;

grant execute on function ggircs_portal.create_naics_code_mutation to ciip_administrator;
comment on function ggircs_portal.create_naics_code_mutation is 'This custom create mutation does an upsert on conflict of the naics_code column, updating the description and setting the deleted at/by columsn to null';

commit;