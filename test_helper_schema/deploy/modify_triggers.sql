-- Deploy test_helpers:modify_triggers to pg
-- requires: schema_test_helper

begin;

-- Disables/Enables all triggers on all tables in the ggircs_portal schema
-- param: trigger_action {'enable', 'disable'} whether to enable or disable the triggers
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




-- iterates over a defined json list of tables and triggers in the ggircs_portal schema
-- to enable or disable those triggers
-- param: trigger_action : {'enable', 'disable'} whether to enable or disable the triggers 
-- param: trigger_data : json data in the format:
-- {
--  "table1": ["trigger1", "trigger2", ...],
--  "table2": ["trigger"],
--  ...
-- }
create or replace function test_helper.modify_triggers(trigger_action text, trigger_data json)
returns void as
$function$
  declare table_name text;
  declare trigger_name text;
  declare trigger_list_json json;
  declare alter_statement text;
  begin

    if (trigger_action not in ('enable', 'disable')) then
      raise notice 'invalid command';
    end if;

    for table_name, trigger_list_json in 
		select parsed_data.key as table_name, parsed_data.value as trigger_list_json 
		from json_each(trigger_data) as parsed_data
    loop
      -- key is the table
      -- value is the array of triggers on that table
      for trigger_name in 
	  	select * from json_array_elements_text(trigger_list_json) as data
      loop
        alter_statement:=concat('alter table ggircs_portal.', table_name, ' ', trigger_action, ' trigger ', trigger_name);
        execute alter_statement;
        raise notice '% % %d', table_name, trigger_name, trigger_action;
      end loop;
    end loop;

  end;

$function$ language plpgsql volatile;

commit;
