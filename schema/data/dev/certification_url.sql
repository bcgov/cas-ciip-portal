/**
  Adds a value into certification_url for application id=1;
  (Not needed for functionality, but keeps true to the actual application flow)
*/

begin;

-- Application window is open, year 2019
select mocks.set_mocked_time_in_transaction(
  (
    select application_open_time
    from ggircs_portal.reporting_year
    where reporting_year = 2019
  )
);

alter table ggircs_portal.certification_url disable trigger _certification_request_email;
alter table ggircs_portal.certification_url disable trigger _signed_by_certifier_email;

with rows as (
insert into ggircs_portal.certification_url(id, application_id, version_number)
overriding system value
values
('\xad58dd1b39a4dff1cc1e0bb1dce2d80793b85e1be4d465f6b598aa5e44558065', 1, 1),('\xad58dd1b39a4dff1cc1e0bb1dce2d80793b85e1be4d465f6b598aa5e44558065', 1, 2)
on conflict(id) do update set
application_id=excluded.application_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.certification_url' from rows;

update ggircs_portal.certification_url set certification_signature = '12345' where application_id =1 and version_number=1;
update ggircs_portal.certification_url set certification_signature = 'signed' where application_id =1 and version_number=2;

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application_revision_status disable trigger _read_only_status_for_non_current_version;

-- Update the status of application with id=1 to be 'submitted'
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1,1,'submitted');

-- Moving timestamp one second forward to avoid revisions being submitted at the same time
select mocks.set_mocked_time_in_transaction(
  (
    select application_open_time
    from ggircs_portal.reporting_year
    where reporting_year = 2019
  )
  + interval '1 second'
);

insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
values (1,2,'submitted');

alter table ggircs_portal.certification_url enable trigger _certification_request_email;
alter table ggircs_portal.certification_url enable trigger _signed_by_certifier_email;
alter table ggircs_portal.application_revision_status enable trigger _status_change_email;
alter table ggircs_portal.application_revision_status enable trigger _read_only_status_for_non_current_version;

commit;
