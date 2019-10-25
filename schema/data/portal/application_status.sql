begin;

insert into ggircs_portal.application_status
(id, application_id, application_status)
overriding system value
values (1, 1, 'draft'), (2, 2, 'pending')
on conflict(id)
do update
set
application_id=excluded.application_id,
application_status=excluded.application_status;

commit;
