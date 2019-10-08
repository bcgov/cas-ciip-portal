import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {graphql} from 'react-relay';
import IncentiveCalculatorContainer from '../containers/Incentives/IncentiveCalculator';
import ApplicationStatus from '../containers/Applications/ApplicationStatus';
import Header from '../components/Header';

// TODO: decide what to show in this page & create a query from the props passed in
class ApplicationDetails extends Component {
  state = {status: null, applicationId: null};

  static query = graphql`
    query applicationdetailsQuery(
      $applicationStatusCondition: ApplicationStatusCondition
    ) {
      query {
        ...ApplicationStatus_query
          @arguments(condition: $applicationStatusCondition)
      }
    }
  `;

  static getInitialProps() {
    return {
      variables: {
        condition: {
          formResultId: this.state ? Number(this.state.applicationId) : null
        }
      }
    };
  }

  setApplicationId = id => {
    this.setState({applicationId: Number(id)});
  };

  setApplicationStatusInState = s => {
    this.setState({status: s});
  };

  render() {
    const {query} = this.props;
    return (
      <>
        <div>
          <Header />
          <Container>
            <ApplicationStatus
              query={query}
              setApplicationId={this.setApplicationId}
              applicationId={this.props.router.query.applicationId}
              newApplicationId={this.state.applicationId}
              status={this.state.status}
              setApplicationStatusInState={this.setApplicationStatusInState}
            />
            <hr />
            {/* <IncentiveCalculatorContainer
                bcghgid={bcghgid}
                reportingYear={reportingYear}
              /> */}
          </Container>
          {/* ) : null} */}
          <hr />
        </div>
      </>
    );
  }
}

export default ApplicationDetails;
