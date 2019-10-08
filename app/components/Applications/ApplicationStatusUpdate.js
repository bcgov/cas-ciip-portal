import React, {Component} from 'react';
import propTypes from 'prop-types';


class ApplicationStatusUpdate extends Component {
  static propTypes = {
    applicationStatus: propTypes.string.isRequired,
    setApplicationStatus: propTypes.func.isRequired
  };

  render() {
    const {applicationStatus, setApplicationStatus} = this.props;
    const statusBadgeColor = {
      pending: 'info',
      attention: 'warning',
      declined: 'danger',
      approved: 'success'
    };

    
}

export default ApplicationStatusUpdate;
