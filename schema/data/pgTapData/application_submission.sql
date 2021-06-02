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

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application_revision_status disable trigger _read_only_status_for_non_current_version;

-- Update the status of application with id=1 to be 'submitted'
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values
  (1,1,'submitted'),
  (4,1,'submitted'),
  (5,1,'submitted');

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

alter table ggircs_portal.application_revision_status enable trigger _status_change_email;
alter table ggircs_portal.application_revision_status enable trigger _read_only_status_for_non_current_version;

commit;
