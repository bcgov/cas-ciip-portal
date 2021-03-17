import React, {Component} from 'react';
import {Row, Col, Button, Alert} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {CiipPageComponentProps} from 'next-env';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ReviseApplicationButton from 'containers/Applications/ReviseApplicationButtonContainer';
import ApplicationDecision from 'components/Application/ApplicationDecision';
import Link from 'next/link';
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
          latestDraftRevision {
            versionNumber
          }
          latestSubmittedRevision {
            versionNumber
          }
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
    const changesRequested = status === 'REQUESTED_CHANGES';
    const hasBeenReviewed = status !== 'SUBMITTED' && status !== 'DRAFT';

    const thisVersion = Number(this.props.router.query.version);
    const latestSubmittedRevision =
      query.application.latestSubmittedRevision?.versionNumber;
    const latestDraftRevision =
      query.application.latestDraftRevision?.versionNumber;

    const newerSubmissionExists = latestSubmittedRevision > thisVersion;
    const newerDraftExists = latestDraftRevision > latestSubmittedRevision;

    const latestSubmissionURL = `/reporter/view-application?applicationId=${encodeURIComponent(
      this.props.router.query.applicationId.toString()
    )}&version=${latestSubmittedRevision}`;
    const viewLatestSubmissionButton = (
      <>
        <p style={{margin: '1rem 0'}}>
          <strong>Note:</strong> There is a more recently submitted version of
          this application.
        </p>
        <Link passHref href={latestSubmissionURL}>
          <Button variant="primary">View most recent submission</Button>
        </Link>
      </>
    );

    const newerDraftURL = `/reporter/application?applicationId=${encodeURIComponent(
      this.props.router.query.applicationId.toString()
    )}&version=${latestDraftRevision}`;
    const resumeLatestDraftButton = (
      <>
        <p style={{margin: '1rem 0'}}>
          <strong>Note:</strong> This application has been revised in a more
          recent draft.
        </p>
        <Link href={newerDraftURL}>
          <a>
            <Button variant="primary">Resume latest draft</Button>
          </a>
        </Link>
      </>
    );

    return (
      <DefaultLayout
        showSubheader
        session={session}
        title="Summary of your application"
      >
        <Row>
          <Col md={12}>
            {hasBeenReviewed && (
              <>
                {newerSubmissionExists && (
                  <Alert variant="secondary">
                    {newerSubmissionExists && viewLatestSubmissionButton}
                  </Alert>
                )}
                <ApplicationDecision
                  actionRequired={changesRequested && !newerSubmissionExists}
                  decision={status}
                  reviewComments={reviewComments}
                >
                  {changesRequested &&
                    !newerSubmissionExists &&
                    !newerDraftExists && (
                      <ReviseApplicationButton
                        application={query.application}
                      />
                    )}
                  {newerDraftExists &&
                    !newerSubmissionExists &&
                    resumeLatestDraftButton}
                </ApplicationDecision>
              </>
            )}
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
