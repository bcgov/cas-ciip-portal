import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ReviseApplicationButton from 'containers/Applications/ReviseApplicationButtonContainer';
import ApplicationDecision from 'components/Application/ApplicationDecision';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

/*
 * ViewApplication renders a summary of the data submitted in the application.
 */

interface Props extends CiipPageComponentProps {
  query: viewApplicationQueryResponse['query'];
}

class ViewApplication extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query viewApplicationQuery($applicationId: ID!, $version: String!) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationDetailsContainer_query
          @arguments(
            applicationId: $applicationId
            oldVersion: $version
            newVersion: $version
          )

        application(id: $applicationId) {
          applicationRevisionStatus(versionNumberInput: $version) {
            applicationRevisionStatus
          }
          reviewCommentsByApplicationId(
            filter: {resolved: {isNull: true}, deletedBy: {isNull: true}}
          ) {
            edges {
              node {
                description
                resolved
                commentType
              }
            }
          }
          orderedFormResults(versionNumberInput: $version) {
            edges {
              node {
                id
                ...ApplicationCommentsContainer_formResult
              }
            }
          }
          ...ReviseApplicationButtonContainer_application

          ...ApplicationDetailsContainer_application
            @arguments(version: $version)
        }
      }
    }
  `;

  render() {
    const {session} = this.props.query;
    const {query} = this.props;
    const reviewComments = query.application?.reviewCommentsByApplicationId.edges.map(
      (result) => result.node.description
    );
    const status =
      query?.application?.applicationRevisionStatus?.applicationRevisionStatus;

    return (
      <DefaultLayout
        showSubheader
        session={session}
        title="Summary of your application"
      >
        <Row>
          <Col md={12}>
            <ApplicationDecision
              changesRequested={status === 'REQUESTED_CHANGES'}
              decision={status === 'REQUESTED_CHANGES' ? null : status}
              reviewComments={reviewComments}
            >
              {status === 'REQUESTED_CHANGES' && (
                <ReviseApplicationButton application={query.application} />
              )}
            </ApplicationDecision>
            <ApplicationDetails
              query={query}
              application={query.application}
              review={false}
              liveValidate={false}
            />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}

export default ViewApplication;
