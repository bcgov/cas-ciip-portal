import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Button, Badge} from 'react-bootstrap';

class ApplicationRowItem extends Component {
  static propTypes = {
    application: propTypes.shape({
      applicationId: propTypes.number,
      applicationStatus: propTypes.string,
      submissionDate: propTypes.string,
      facilityName: propTypes.string,
      operatorName: propTypes.string,
      reportingYear: propTypes.string,
      bcghgid: propTypes.string
    }).isRequired
  };

  render() {
    const {application} = this.props;
    console.log('my application', application);
    const statusBadgeColor = {
      attention: 'warning',
      pending: 'info',
      declined: 'danger',
      approved: 'success'
    };

    const applicationDetails = `/application-details?application_id=${application.applicationId}&reportingyear=${application.reportingYear}&bcghgid=${application.bcghgid}`;

    return (
      <tr>
        <td>{application.applicationId}</td>
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
  }
}

export default ApplicationRowItem;
