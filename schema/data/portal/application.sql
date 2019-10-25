begin;

insert into ggircs_portal.application(id, facility_id)
overriding system value
values (1,2), (2,3)
on conflict(id) do update set facility_id=excluded.facility_id;

commit;
