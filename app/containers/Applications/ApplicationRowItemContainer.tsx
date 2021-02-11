import React from 'react';
import {Button, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import Link from 'next/link';
import {dateTimeFormat} from 'functions/formatDates';

const statusBadgeColor = {
  draft: 'warning',
  submitted: 'info',
  rejected: 'danger',
  approved: 'success',
  'requested changes': 'secondary'
};

export const ApplicationRowItem = (props) => {
  const {application = {}} = props;
  const readableSubmissionDate = dateTimeFormat(
    application.submissionDate,
    'seconds'
  );

  return (
    <tr>
      <td>{application.rowId}</td>
      <td>{application.operatorName}</td>
      <td>{application.facilityName}</td>
      <td>{application.reportingYear}</td>
      <td>{readableSubmissionDate}</td>
      <td>
        <Badge
          pill
          style={{width: '100%'}}
          variant={statusBadgeColor[application.status]}
        >
          {application.status}
        </Badge>
      </td>
      <td>
        <Link
          href={{
            pathname: '/analyst/application-review',
            query: {
              applicationId: application.id,
              applicationRevisionId: application.latestSubmittedRevision?.id,
              version: application.latestSubmittedRevision?.versionNumber
            }
          }}
        >
          <Button variant="primary">View Application</Button>
        </Link>
      </td>
    </tr>
  );
};

export default createFragmentContainer(ApplicationRowItem, {
  application: graphql`
    fragment ApplicationRowItemContainer_application on Application {
      id
      rowId
      operatorName
      facilityName
      status
      reportingYear
      bcghgid
      submissionDate
      latestSubmittedRevision {
        id
        versionNumber
      }
    }
  `
});
