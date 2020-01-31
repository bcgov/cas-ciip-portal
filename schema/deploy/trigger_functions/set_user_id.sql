-- Deploy ggircs-portal:function_set_user_id to pg
-- requires: function_session
-- requires: table_ciip_user

begin;
create function ggircs_portal.set_user_id()
  returns trigger as $$

declare
  user_sub uuid;
begin
  user_sub := (select sub from ggircs_portal.session());
  new.user_id := (select id from ggircs_portal.ciip_user as cu where cu.uuid = user_sub);
  return new;
end;
$$ language plpgsql volatile;

grant execute on function ggircs_portal.set_user_id to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on function ggircs_portal.set_user_id()
  is $$
  a trigger to set a user_id foreign key column.
  example usage:

  create table some_schema.some_table (
    user_id int references ggircs_portal.ciip_user(id)
    ...
  );
  create trigger _set_user_id
    before update of some_column on some_schema.some_table
    for each row
    execute procedure ggircs_portal.set_user_id();
  $$;

commit;
