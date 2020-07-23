import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';
import {Row, Col} from 'react-bootstrap';
import IncentiveCalculatorContainer from 'containers/Incentives/IncentiveCalculatorContainer';
import ApplicationRevisionStatusContainer from 'containers/Applications/ApplicationRevisionStatusContainer';
import DefaultLayout from 'layouts/default-layout';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationComments from 'containers/Applications/ApplicationCommentsContainer';
import ApplicationOverrideNotification from 'components/Application/ApplicationOverrideNotificationCard';
import {CiipPageComponentProps} from 'next-env';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props extends CiipPageComponentProps {
  query: applicationReviewQueryResponse['query'];
}

class ApplicationReview extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query applicationReviewQuery(
      $applicationRevisionId: ID!
      $applicationId: ID!
      $version: String!
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          rowId
          reviewRevisionStatus: applicationRevisionStatus(
            versionNumberInput: $version
          ) {
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
        applicationRevision(id: $applicationRevisionId) {
          overrideJustification
          ...IncentiveCalculatorContainer_applicationRevision
        }
        ...ApplicationDetailsContainer_query
          @arguments(applicationId: $applicationId, newVersion: $version)
      }
    }
  `;

  render() {
    const {query} = this.props;
    const {overrideJustification} = query?.applicationRevision;
    const {session} = query || {};
    const formResults = query.application.orderedFormResults.edges;
    return (
      <DefaultLayout session={session} width="wide">
        <ApplicationRevisionStatusContainer
          applicationRevisionStatus={query.application.reviewRevisionStatus}
          applicationRowId={query.application.rowId}
        />
        {overrideJustification && (
          <ApplicationOverrideNotification
            overrideJustification={overrideJustification}
          />
        )}
        <hr />
        <Row className="application-container">
          <Col md={8} className="application-body">
            <ApplicationDetails
              review
              query={query}
              application={query.application}
              liveValidate={false}
            />
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
