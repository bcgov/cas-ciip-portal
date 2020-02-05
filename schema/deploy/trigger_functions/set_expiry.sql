-- Deploy ggircs-portal:function_set_expiry to pg
-- requires: schema_ggircs_portal

begin;

create function ggircs_portal.set_expiry()
  returns trigger as $$
declare
  interval_value interval;
begin
  interval_value := TG_ARGV[0];
  new.expires_at := now() + interval_value;
  return new;
end;
$$ language plpgsql;

grant execute on function ggircs_portal.set_expiry to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on function ggircs_portal.set_expiry()
  is $$
  a trigger to set expires_at column.
  example usage:

  create table some_schema.some_table (
    ...
    expires_at timestamp with time zone not null
  );
  create trigger _set_expiry
    before insert on some_schema.some_table
    for each row
    execute procedure ggircs_portal.set_expiry('7 days');
  $$;

commit;
