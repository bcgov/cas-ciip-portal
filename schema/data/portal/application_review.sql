begin;

with rows as (
insert into ggircs_portal.application_review(id, form_result_id, review_status)
overriding system value
values (1,1, 'pending'), (2,2, 'pending'), (3,3, 'pending'), (4,4, 'pending'), (5,5, 'pending')
on conflict(id) do update set
form_result_id=excluded.form_result_id,
review_status=excluded.review_status
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.application_review' from rows;

select setval from
setval('ggircs_portal.application_review_id_seq', (select max(id) from ggircs_portal.application_review), true)
where setval = 0;

commit;
