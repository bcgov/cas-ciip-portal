-- Deploy ggircs-portal:function_update_timestamps to pg
-- requires: schema_ggircs_portal

begin;

create function ggircs_portal.update_timestamps()
  returns trigger as $$
begin
  if tg_op = 'INSERT' then
    new.created_at = now();
    new.updated_at = now();
  elsif tg_op = 'UPDATE' then
    if old.deleted_by is distinct from new.deleted_by then
      new.deleted_at = now();
    else
      new.created_at = old.created_at;
      new.updated_at = greatest(now(), old.updated_at + interval '1 millisecond');
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

comment on function ggircs_portal.update_timestamps()
  is $$
  a trigger to set created_at and updated_at columns.
  example usage:

  create table some_schema.some_table (
    ...
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
  );
  create trigger _100_timestamps
    before insert or update on some_schema.some_table
    for each row
    execute procedure ggircs_portal.update_timestamps();
  $$;

commit;
