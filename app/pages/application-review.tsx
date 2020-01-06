import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';
import {Row, Col} from 'react-bootstrap';
import IncentiveCalculatorContainer from 'containers/Incentives/IncentiveCalculatorContainer';
import ApplicationRevisionStatusContainer from 'containers/Applications/ApplicationRevisionStatusContainer';
import DefaultLayout from 'layouts/default-layout';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationComments from 'containers/Applications/ApplicationCommentsContainer';
import {CiipPageComponentProps} from 'next-env';

interface Props extends CiipPageComponentProps {
  query: applicationReviewQueryResponse['query'];
}

class ApplicationReview extends Component<Props> {
  static query = graphql`
    query applicationReviewQuery(
      $applicationId: ID!
      $revisionId: ID!
      $version: String!
    ) {
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
          orderedFormResults(versionNumberInput: $version) {
            edges {
              node {
                id
                ...ApplicationCommentsContainer_formResult
              }
            }
          }
        }
        applicationRevision(id: $revisionId) {
          ...IncentiveCalculatorContainer_applicationRevision
        }
        ...ApplicationDetailsContainer_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    const {session} = query || {};
    const formResults = query.application.orderedFormResults.edges;
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
            <ApplicationDetails query={query} application={query.application} />
            <IncentiveCalculatorContainer
              applicationRevision={query.applicationRevision}
            />
          </Col>
          <Col md={4} className="application-comments">
            {formResults.map(({node}) => (
              <ApplicationComments key={node.id} review formResult={node} />
            ))}
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
