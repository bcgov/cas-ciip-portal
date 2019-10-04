import React from 'react';
import {Button, Badge} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';

const ApplicationRowItemContainer = props => {
  const {ciipApplication} = props;
  const statusBadgeColor = {
    attention: 'warning',
    pending: 'info',
    declined: 'danger',
    approved: 'success'
  };

  const applicationDetails = `/application-details?application_id=${ciipApplication.rowId}&reportingyear=${ciipApplication.reportingYear}&bcghgid=${ciipApplication.bcghgid}`;

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
        <Button href={applicationDetails} target="_blank" variant="primary">
          View Application
        </Button>
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
