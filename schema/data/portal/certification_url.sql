begin;

with rows as (
insert into ggircs_portal.certification_url(id, application_id)
overriding system value
values
('474408f9-4b85-4e80-9c0f-b5492fac4c57', 1)
on conflict(id) do update set
application_id=excluded.application_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.certification_url' from rows;

commit;
