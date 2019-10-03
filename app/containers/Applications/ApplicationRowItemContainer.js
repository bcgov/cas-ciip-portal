import React from 'react';
import propTypes from 'prop-types';
import {Button, Badge} from 'react-bootstrap';

const ApplicationRowItemContainer = props => {
  const {application} = props;
  const statusBadgeColor = {
    attention: 'warning',
    pending: 'info',
    declined: 'danger',
    approved: 'success'
  };

  const applicationDetails = `/application-details?application_id=${application.rowId}&reportingyear=${application.reportingYear}&bcghgid=${application.bcghgid}`;

  return (
    <tr>
      <td>{application.rowId}</td>
      <td>{application.operatorName}</td>
      <td>{application.facilityName}</td>
      <td>{application.submissionDate}</td>
      <td>
        <Badge
          pill
          style={{width: '100%'}}
          variant={statusBadgeColor[application.applicationStatus]}
        >
          {application.applicationStatus}
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
  query: graphql`
    fragment ApplicationRowItemContainer_query on CiipApplication {
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
