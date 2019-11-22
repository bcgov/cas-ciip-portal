import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationDetailsQueryResponse} from 'applicationDetailsQuery.graphql';
import {NextRouter} from 'next/router';
import IncentiveCalculatorContainer from '../containers/Incentives/IncentiveCalculatorContainer';
import ApplicationStatusContainer from '../containers/Applications/ApplicationStatusContainer';
import DefaultLayout from '../layouts/default-layout';
import ApplicationDetail from '../containers/Applications/ApplicationDetailsContainer';

interface Props {
  query: applicationDetailsQueryResponse['query'];
  router: NextRouter;
}

class ApplicationDetails extends Component<Props> {
  static query = graphql`
    query applicationDetailsQuery(
      $applicationStatusCondition: ApplicationStatusCondition
      $bcghgidInput: BigFloat
      $reportingYear: String
      $applicationGUID: ID!
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationStatusContainer_query
          @arguments(condition: $applicationStatusCondition)
        ...IncentiveCalculatorContainer_query
          @arguments(bcghgidInput: $bcghgidInput, reportingYear: $reportingYear)
        ...ApplicationDetailsContainer_query
          @arguments(applicationId: $applicationGUID)
      }
    }
  `;

  static getInitialProps() {
    return {
      variables: {
        condition: {
          rowId: null
        }
      }
    };
  }

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout session={session}>
        <ApplicationStatusContainer
          query={query}
          applicationId={this.props.router.query.applicationId}
        />
        <hr />

        <ApplicationDetail isAnalyst query={query} />
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
