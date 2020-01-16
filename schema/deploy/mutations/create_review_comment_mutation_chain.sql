-- Deploy ggircs-portal:mutations/create_review_comment_mutation_chain to pg
-- requires: tables/review_comment
-- requires: tables/form_result_status

begin;

create or replace function ggircs_portal.create_review_comment_mutation_chain(
  application_id_input int,
  form_id_input int,
  description_input varchar(10000),
  comment_type_input ggircs_portal.review_comment_type,
  version_number_input int
)
returns ggircs_portal.review_comment
as $function$
declare
  new_id int;
  result ggircs_portal.review_comment;
begin

  -- Insert new value into review_comment
  insert into ggircs_portal.review_comment(application_id, form_id, description, comment_type)
  values (application_id_input, form_id_input, description_input, comment_type_input)
  returning id into new_id;

  -- Change review status if comment_type is internal or requested change
  if comment_type_input = 'internal' then
    insert into ggircs_portal.form_result_status (application_id, form_id, version_number, form_result_status)
      values (application_id_input, form_id_input, version_number_input, 'needs attention'::ggircs_portal.ciip_form_result_status);
  elsif comment_type_input = 'requested change' then
    insert into ggircs_portal.form_result_status (application_id, form_id, version_number, form_result_status)
      values (application_id_input, form_id_input, version_number_input, 'changes requested'::ggircs_portal.ciip_form_result_status);
  elsif comment_type_input = 'approval' then
    insert into ggircs_portal.form_result_status (application_id, form_id, version_number, form_result_status)
      values (application_id_input, form_id_input, version_number_input, 'approved'::ggircs_portal.ciip_form_result_status);
  end if;

  select * from ggircs_portal.review_comment where id = new_id into result;
  return result;
end;
$function$ language plpgsql volatile;

commit;
