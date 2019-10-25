begin;

insert into ggircs_portal.benchmark(id, product_id, benchmark, eligibility_threshold, start_date)
overriding system value
values
(1, 1, 600, 1500, '2019-09-17 14:49:54.191757-07'),
(2, 2, 200, 1000,'2019-09-17 14:49:54.191757-07'),
(3, 3, 1200, 5000,'2019-09-17 14:49:54.191757-07'),
(4, 4, 5000, 20000,'2019-09-17 14:49:54.191757-07')
on conflict(id) do update set
product_id=excluded.product_id,
benchmark=excluded.benchmark,
eligibility_threshold=excluded.eligibility_threshold,
start_date=excluded.start_date;

commit;
