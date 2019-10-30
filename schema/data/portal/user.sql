begin;

with rows as (
insert into ggircs_portal.user (id, uuid, first_name, last_name, email_address, occupation, phone_number)
overriding system value
values
  (1, '6c01258f-6ad8-4790-8ccc-485163f122a5' , 'Douglas', 'Fir', 'Douglas.Fir@hhry.xxx', 'Tree', '123456789'),
  (2, 'ca716545-a8d3-4034-819c-5e45b0e775c9' , 'Argus', 'Filch', 'argus@squibs.hp', 'Custodian', '123456789')
on conflict(id) do update set
  uuid=excluded.uuid,
  first_name=excluded.first_name,
  last_name=excluded.last_name,
  email_address=excluded.email_address,
  occupation=excluded.occupation,
  phone_number=excluded.phone_number
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.user' from rows;

select setval from
setval('ggircs_portal.user_id_seq', (select max(id) from ggircs_portal.user), true)
where setval = 0;

commit;
