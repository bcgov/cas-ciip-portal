import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';
import {NextRouter} from 'next/router';
import {Row, Col} from 'react-bootstrap';
// Import IncentiveCalculatorContainer from '../containers/Incentives/IncentiveCalculatorContainer';
import ApplicationRevisionStatusContainer from '../containers/Applications/ApplicationRevisionStatusContainer';
import DefaultLayout from '../layouts/default-layout';
import ApplicationDetail from '../containers/Applications/ApplicationDetailsContainer';
import ApplicationComments from '../containers/Applications/ApplicationCommentsContainer';

interface Props {
  query: applicationReviewQueryResponse['query'];
  router: NextRouter;
  isAnalyst: boolean;
}

class ApplicationReview extends Component<Props> {
  static query = graphql`
    query applicationReviewQuery($applicationId: ID!, $version: String!) {
      query {
        session {
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          rowId
          applicationRevisionStatus {
            ...ApplicationRevisionStatusContainer_applicationRevisionStatus
          }
          ...ApplicationDetailsContainer_application
            @arguments(version: $version)
        }
        ...ApplicationDetailsContainer_query
        ...ApplicationCommentsContainer_query
          @arguments(applicationId: $applicationId)
      }
    }
  `;

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout session={session} width="wide">
        <ApplicationRevisionStatusContainer
          applicationRevisionStatus={
            query.application.applicationRevisionStatus
          }
          applicationRowId={query.application.rowId}
        />
        <hr />
        <Row className="application-container">
          <Col md={8} className="application-body">
            <ApplicationDetail
              isAnalyst
              query={query}
              application={query.application}
            />
            {/* TODO: Fix this container. it is borked */}
            {/* <IncentiveCalculatorContainer
              query={query}
              bcghgid={this.props.router.query.bcghgid}
              reportingYear={this.props.router.query.reportingYear}
            /> */}
          </Col>
          <Col md={4} className="application-comments">
            <ApplicationComments query={query} />
          </Col>
        </Row>
        <style jsx>{`
          .container {
            display: none;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default ApplicationReview;

/*
TODO: Instead on conditionally rendering the ApplicationDetail,
 the page component should pass a renderItemHeaderContent function
 */
