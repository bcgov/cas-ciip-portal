-- Deploy test_helpers:modify_triggers to pg
-- requires: schema_test_helper

begin;

create or replace function test_helper.modify_triggers(trigger_action text)
returns void as
$function$
  declare table_name text;
  declare table_trigger text;
  declare alter_statement text;
  begin

    if (trigger_action not in ('enable', 'disable')) then
      raise notice 'invalid command';
    end if;

    for table_name, table_trigger in
      select event_object_table as table_name, trigger_name as table_trigger
      from information_schema.triggers
      where event_object_schema='ggircs_portal'
      order by table_name asc

    loop
      alter_statement:=concat('alter table ggircs_portal.', table_name, ' ', trigger_action, ' trigger ', table_trigger);
      execute alter_statement;
      raise notice '% % %d', table_name, table_trigger, trigger_action;
    end loop;
  end;

$function$ language plpgsql volatile;

commit;
