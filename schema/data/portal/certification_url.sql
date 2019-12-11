begin;

with rows as (
insert into ggircs_portal.certification_url(id, application_id)
overriding system value
values
('\xad58dd1b39a4dff1cc1e0bb1dce2d80793b85e1be4d465f6b598aa5e44558065', 1)
on conflict(id) do update set
application_id=excluded.application_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.certification_url' from rows;

commit;
