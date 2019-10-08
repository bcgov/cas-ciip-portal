import React from 'react';
import {Button, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import Link from 'next/link';

const ApplicationRowItemContainer = props => {
  const {ciipApplication} = props;
  const statusBadgeColor = {
    attention: 'warning',
    pending: 'info',
    declined: 'danger',
    approved: 'success'
  };

  return (
    <tr>
      <td>{ciipApplication.rowId}</td>
      <td>{ciipApplication.operatorName}</td>
      <td>{ciipApplication.facilityName}</td>
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
            pathname: '/applicationdetails',
            query: {
              applicationId: ciipApplication.rowId,
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

export default createFragmentContainer(ApplicationRowItemContainer, {
  ciipApplication: graphql`
    fragment ApplicationRowItemContainer_ciipApplication on CiipApplication {
      rowId
      facilityName
      operatorName
      applicationStatus
      submissionDate
      reportingYear
      bcghgid
    }
  `
});
