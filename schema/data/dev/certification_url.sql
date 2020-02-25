/**
  Adds a value into certification_url for application id=1;
  (Not needed for functionality, but keeps true to the actual application flow)
*/

begin;

with rows as (
insert into ggircs_portal.certification_url(id, application_id, version_number)
overriding system value
values
('\xad58dd1b39a4dff1cc1e0bb1dce2d80793b85e1be4d465f6b598aa5e44558065', 1, 1)
on conflict(id) do update set
application_id=excluded.application_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.certification_url' from rows;

update ggircs_portal.certification_url set certification_signature = '12345' where application_id =1 and version_number=1;

-- Update the status of application with id=1 to be 'submitted'
  update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id=1 and version_number = 1;

commit;
