import React, {Component} from 'react';
import {graphql, fetchQuery} from 'react-relay';
import propTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';

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

class ApplicationStatusContainer extends Component {
  propTypes = {
    applicationId: propTypes.number.isRequired
  };

  state = {status: ''};

  getApplicationStatus = async () => {
    const queryReturn = await fetchQuery(environment, getStatus, {
      $applicationStatusCondition: {formResultId: this.props.applicationId}
    });
    console.log(status);
    console.log(this.props);
    // This.setState({status: queryReturn.allApplicationStatuses.nodes[0].applicationStatus});
  };

  componentDidMount() {
    this.getApplicationStatus();
  }

  render() {
    return (
      <>
        <Container style={{padding: 10, background: '#dee2e6'}}>
          <div>
            <h1>{this.state.status}</h1>
          </div>
        </Container>
      </>
    );
  }
}

export default ApplicationStatusContainer;
