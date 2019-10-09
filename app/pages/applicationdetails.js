import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {graphql} from 'react-relay';
import IncentiveCalculatorContainer from '../containers/Incentives/IncentiveCalculatorContainer';
import ApplicationStatusContainer from '../containers/Applications/ApplicationStatusContainer';
import Header from '../components/Header';

// TODO: decide what to show in this page
class ApplicationDetails extends Component {
  state = {
    applicationId: null,
    bcghgid: null,
    reportingYear: null
  };

  static query = graphql`
    query applicationdetailsQuery(
      $applicationStatusCondition: ApplicationStatusCondition
      $bcghgidInput: BigFloat
      $reportingYear: String
    ) {
      query {
        ...ApplicationStatusContainer_query
          @arguments(condition: $applicationStatusCondition)
        ...IncentiveCalculatorContainer_query
          @arguments(bcghgidInput: $bcghgidInput, reportingYear: $reportingYear)
      }
    }
  `;

  static getInitialProps() {
    return {
      variables: {
        condition: {
          formResultId: this.state ? Number(this.state.applicationId) : null
        },
        bcghgidInput: this.state ? this.state.bcghgid : null,
        reportingYear: this.state ? this.state.reportingYear : null
      }
    };
  }

  setApplicationId = id => {
    this.setState({applicationId: Number(id)});
  };

  setBcghgidInState = b => {
    this.setState({bcghgid: b});
  };

  setReportingYearInState = r => {
    this.setState({reportingYear: r});
  };

  render() {
    const {query} = this.props;
    return (
      <>
        <div>
          <Header />
          <Container>
            <ApplicationStatusContainer
              query={query}
              applicationId={this.props.router.query.applicationId}
            />
            <hr />
            <IncentiveCalculatorContainer
              query={query}
              bcghgid={this.props.router.query.bcghgid}
              reportingYear={this.props.router.query.reportingYear}
              setBcghgidInState={this.setBcghgidInState}
              setReportingYearInState={this.setReportingYearInState}
            />
          </Container>
          <hr />
        </div>
      </>
    );
  }
}

export default ApplicationDetails;
