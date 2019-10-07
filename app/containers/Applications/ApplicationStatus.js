import React, {Component} from 'react';
import {graphql, fetchQuery, commitMutation} from 'react-relay';
import propTypes from 'prop-types';
// Import initEnvironment from '../../lib/createRelayEnvironment';
import ApplicationStatusUpdate from '../../components/Applications/ApplicationStatusUpdate';

// Const environment = initEnvironment();

const getStatus = graphql`
  query ApplicationStatusQuery(
    $applicationStatusCondition: ApplicationStatusCondition
  ) {
    allApplicationStatuses(condition: $applicationStatusCondition) {
      nodes {
        applicationStatus
      }
    }
  }
`;

const setStatus = graphql`
  mutation ApplicationStatusMutation(
    $input: UpdateApplicationStatusByRowIdInput!
  ) {
    updateApplicationStatusByRowId(input: $input) {
      applicationStatus {
        rowId
      }
    }
  }
`;

class ApplicationStatus extends Component {
  state = {status: null};

  getApplicationStatus = async () => {
    if (this.props.applicationId) {
      const formResultId = Number(this.props.applicationId);
      const queryReturn = await fetchQuery(environment, getStatus, {
        applicationStatusCondition: {
          formResultId
        }
      });

      this.setState({
        status: queryReturn.allApplicationStatuses.nodes[0].applicationStatus
      });
    }
  };

  setApplicationStatus = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    this.setState({status: eventKey});
    const date = new Date().toUTCString();
    const saveVariables = {
      input: {
        rowId: Number(this.props.applicationId),
        applicationStatusPatch: {
          applicationStatus: eventKey,
          updatedAt: date,
          updatedBy: 'Admin'
        }
      }
    };

    const saveMutation = setStatus;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: response => {
        console.log(response);
      },
      onError: err => console.error(err)
    });
  };

  componentDidMount() {
    this.getApplicationStatus();
  }

  render() {
    return (
      <>
        {this.state.status ? (
          <ApplicationStatusUpdate
            applicationStatus={this.state.status}
            setApplicationStatus={this.setApplicationStatus}
          />
        ) : null}
      </>
    );
  }

  static propTypes = {
    applicationId: propTypes.string.isRequired
  };
}

export default ApplicationStatus;
