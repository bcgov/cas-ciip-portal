-- Deploy ggircs-portal:function_application_review_mutation_chain to pg
-- requires: table_application
-- requires: table_application_review
-- requires: table_review_comment

begin;

create or replace function ggircs_portal.create_application_review_mutation_chain (
  form_result_id_input int,
  review_status_input ggircs_portal.application_review_status,
  review_comment_input varchar(100000)
)
returns ggircs_portal.application_review
as $function$
declare
  new_application_review_id int;
  result ggircs_portal.application_review;
begin
  insert into ggircs_portal.application_review(form_result_id, review_status)
  values (form_result_id_input, review_status_input)
  returning id into new_application_review_id;

  insert into ggircs_portal.review_comment (application_review_id, description, status)
  values (new_application_review_id, review_comment_input, 'active');

  select * from ggircs_portal.application_review where id = new_application_review_id into result;
  return result;
end;
$function$ language plpgsql strict volatile;

commit;
