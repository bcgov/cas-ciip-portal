begin;

insert into ggircs_portal.review_step(step_name, is_active)
  values ('administrative', true), ('technical', true)
  on conflict(step_name) do update set is_active=excluded.is_active;

commit;
