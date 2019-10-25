begin;

insert into ggircs_portal.application_status(application_id, application_status)
values (1, 'pending'), (2, 'pending')
on conflict(application_id) do update set application_status=excluded.application_status;

commit;
