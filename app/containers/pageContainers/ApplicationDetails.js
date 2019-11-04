import React, {Component} from 'react';
import {graphql} from 'react-relay';
import IncentiveCalculatorContainer from '../Incentives/IncentiveCalculatorContainer';
import ApplicationStatusContainer from '../Applications/ApplicationStatusContainer';
import DefaultLayout from '../../layouts/default-layout';

// TODO: decide what to show in this page
class ApplicationDetails extends Component {
  state = {
    applicationId: null
  };

  static query = graphql`
    query ApplicationDetailsQuery(
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
          rowId: this.state ? Number(this.state.applicationId) : null
        }
      }
    };
  }

  setApplicationId = id => {
    this.setState({applicationId: Number(id)});
  };

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout>
        <ApplicationStatusContainer
          query={query}
          applicationId={this.props.router.query.applicationId}
        />
        <hr />
        <IncentiveCalculatorContainer
          query={query}
          bcghgid={this.props.router.query.bcghgid}
          reportingYear={this.props.router.query.reportingYear}
        />
      </DefaultLayout>
    );
  }
}

export default ApplicationDetails;
