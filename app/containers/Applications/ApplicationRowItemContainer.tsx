import React from 'react';
import {Button, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import Link from 'next/link';

export const ApplicationRowItem = props => {
  const {ciipApplication = {}} = props;
  const statusBadgeColor = {
    DRAFT: 'warning',
    PENDING: 'info',
    REJECTED: 'danger',
    APPROVED: 'success'
  };

  return (
    <tr>
      <td>{ciipApplication.rowId}</td>
      <td>{ciipApplication.operatorName}</td>
      <td>{ciipApplication.facilityName}</td>
      <td>{ciipApplication.reportingYear}</td>
      <td>{ciipApplication.submissionDate}</td>
      <td>
        <Badge
          pill
          style={{width: '100%'}}
          variant={statusBadgeColor[ciipApplication.applicationStatus]}
        >
          {ciipApplication.applicationStatus}
        </Badge>
      </td>
      <td>
        <Link
          href={{
            pathname: '/application-review',
            query: {
              applicationId: ciipApplication.rowId,
              applicationGUID: ciipApplication.applicationByRowId.id,
              reportingYear: ciipApplication.reportingYear,
              bcghgid: ciipApplication.bcghgid
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
  ciipApplication: graphql`
    fragment ApplicationRowItemContainer_ciipApplication on CiipApplication {
      id
      rowId
      facilityName
      operatorName
      submissionDate
      reportingYear
      bcghgid
      applicationStatus
      applicationByRowId {
        id
      }
    }
  `
});
