import React, {Component} from 'react';
import {graphql, fetchQuery, commitMutation} from 'react-relay';
import propTypes from 'prop-types';
import initEnvironment from '../../lib/createRelayEnvironment';
import ApplicationStatusUpdate from '../../components/Applications/ApplicationStatusUpdate';

const environment = initEnvironment();

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

class ApplicationStatusContainer extends Component {
  state = {status: null, displayStatus: null};

  getApplicationStatus = async () => {
    let queryReturn;
    if (this.props) {
      const formResultId = Number(this.props.applicationId);
      queryReturn = await fetchQuery(environment, getStatus, {
        applicationStatusCondition: {
          formResultId
        }
      });
    }

    this.setState({
      status: queryReturn.allApplicationStatuses.nodes[0].applicationStatus,
      displayStatus: queryReturn.allApplicationStatuses.nodes[0].applicationStatus.replace(
        /^\w/,
        char => char.toUpperCase()
      )
    });
  };

  setApplicationStatus = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    this.setState({status: eventKey, displayStatus: event.target.text});
    const date = new Date().toUTCString();
    const saveVariables = {
      input: {
        rowId: 1,
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

  componentDidUpdate(prevProps) {
    if (prevProps.applicationId !== this.props.applicationId)
      this.getApplicationStatus();
  }

  render() {
    return (
      <>
        {this.state.status ? (
          <ApplicationStatusUpdate
            applicationStatus={this.state.status}
            displayStatus={this.state.displayStatus}
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

export default ApplicationStatusContainer;
