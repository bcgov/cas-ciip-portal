-- Deploy ggircs-portal:function_update_timestamps to pg
-- requires: schema_ggircs_portal

begin;

create function ggircs_portal.update_timestamps()
  returns trigger as $$

declare
  user_sub uuid;
  ciip_user_id int;

begin
  user_sub := (select sub from ggircs_portal.session());
  ciip_user_id := (select id from ggircs_portal.ciip_user as cu where cu.uuid = user_sub);
  if tg_op = 'INSERT' then
    new.created_at = now();
    new.created_by = ciip_user_id;
    new.updated_at = now();
    new.updated_by = ciip_user_id;
  elsif tg_op = 'UPDATE' then
    if old.deleted_at is distinct from new.deleted_at then
      new.deleted_at = now();
      new.deleted_by = ciip_user_id;
    else
      new.created_at = old.created_at;
      new.updated_at = greatest(now(), old.updated_at + interval '1 millisecond');
      new.updated_by = ciip_user_id;
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
