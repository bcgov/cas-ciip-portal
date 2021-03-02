import React from 'react';
import {Button, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import Link from 'next/link';
import {dateTimeFormat} from 'functions/formatDates';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';
import {
  ApplicationRowItemContainer_application,
  CiipApplicationRevisionStatus
} from 'ApplicationRowItemContainer_application.graphql';

interface Props {
  application: ApplicationRowItemContainer_application;
}

const statusBadgeColor: Record<
  CiipApplicationRevisionStatus,
  'warning' | 'info' | 'danger' | 'success' | 'secondary'
> = {
  DRAFT: 'warning',
  SUBMITTED: 'info',
  REJECTED: 'danger',
  APPROVED: 'success',
  REQUESTED_CHANGES: 'secondary'
};

export const ApplicationRowItem: React.FunctionComponent<Props> = (props) => {
  const {application} = props;
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
          style={{width: '100%', textTransform: 'uppercase'}}
          variant={statusBadgeColor[application.status]}
        >
          {getUserFriendlyStatusLabel(application.status)}
        </Badge>
      </td>
      <td>
        <Link
          passHref
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
      submissionDate
      latestSubmittedRevision {
        id
        versionNumber
      }
    }
  `
});
