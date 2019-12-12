import React from 'react';
import {Button, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {CiipApplicationRevisionStatus} from 'ApplicationRowItemContainer_Application.graphql';
import Link from 'next/link';

const statusBadgeColor: Record<
  CiipApplicationRevisionStatus,
  'info' | 'danger' | 'success' | 'warning' | 'primary' | 'secondary'
> = {
  DRAFT: 'warning',
  PENDING: 'info',
  REJECTED: 'danger',
  APPROVED: 'success',
  CHANGES_SUBMITTED: 'primary',
  REQUESTED_CHANGES: 'secondary'
};
export const ApplicationRowItem = props => {
  const {application = {}} = props;

  return (
    <tr>
      <td>{application.rowId}</td>
      <td>{application.operatorName}</td>
      <td>{application.facilityName}</td>
      <td>{application.reportingYear}</td>
      <td>{application.submissionDate}</td>
      <td>
        <Badge
          pill
          style={{width: '100%'}}
          variant={statusBadgeColor[application.applicationRevisionStatus]}
        >
          {application.applicationRevisionStatus}
        </Badge>
      </td>
      <td>
        <Link
          href={{
            pathname: '/application-review',
            query: {
              applicationId: application.rowId,
              applicationGUID: application.applicationByRowId.id,
              reportingYear: application.reportingYear,
              bcghgid: application.bcghgid
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
    }
  `
});
