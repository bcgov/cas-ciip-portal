import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import {withRouter} from 'next/router';
import {graphql} from 'react-relay';
import IncentiveCalculatorContainer from '../containers/Incentives/IncentiveCalculator';
import ApplicationStatus from '../containers/Applications/ApplicationStatus';
import Header from '../components/Header';

// TODO: decide what to show in this page & create a query from the props passed in
class ApplicationDetails extends Component {
  state = {status: null, query: null, applicationId: null};

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

  static async getInitialProps() {
    return {
      variables: {
        condition: {
          rowId: this.state ? Number(this.state.applicationId) : 1
        }
      }
    };
  }

  setApplicationId = id => {
    console.log(typeof parseInt(id));
    this.setState({applicationId: Number(id)});
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
