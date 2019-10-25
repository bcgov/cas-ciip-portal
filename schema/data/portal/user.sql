begin;

insert into ggircs_portal.user (id, uuid, first_name, last_name, email_address)
overriding system value
values
  (1, '6c01258f-6ad8-4790-8ccc-485163f122a5' , 'Douglas', 'Fir', 'Douglas.Fir@hhry.xxx'),
  (2, 'ca716545-a8d3-4034-819c-5e45b0e775c9' , 'Argus', 'Filch', 'argus@squibs.hp')
on conflict(id) do update set
  uuid=excluded.uuid,
  first_name=excluded.first_name,
  last_name=excluded.last_name,
  email_address=excluded.email_address;

commit;
