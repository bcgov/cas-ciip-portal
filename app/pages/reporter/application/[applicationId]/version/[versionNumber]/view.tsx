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
import {getViewApplicationPageRoute} from 'routes';

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
    query viewApplicationQuery($applicationId: ID!, $versionNumber: String!) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationDetailsContainer_query

        application(id: $applicationId) {
          rowId
          facilityByFacilityId {
            bcghgid
          }
          latestDraftRevision {
            versionNumber
          }
          latestSubmittedRevision {
            versionNumber
          }
          applicationRevisionStatus(versionNumberInput: $versionNumber) {
            applicationRevisionStatus
          }
          applicationReviewStepsByApplicationId {
            edges {
              node {
                reviewCommentsByApplicationReviewStepId(
                  filter: {resolved: {isNull: true}, deletedAt: {isNull: true}}
                ) {
                  edges {
                    node {
                      description
                    }
                  }
                }
              }
            }
          }
          ...ReviseApplicationButtonContainer_application
          applicationRevisionByStringVersionNumber(
            versionNumberInput: $versionNumber
          ) {
            ...ApplicationDetailsContainer_applicationRevision
          }
        }
      }
    }
  `;

  state = {newerDraftExists: undefined};

  render() {
    const {session} = this.props.query;
    const {query, router} = this.props;
    const {application} = query;
    const reviewSteps =
      application?.applicationReviewStepsByApplicationId.edges;
    // Merge review comments from all applicationReviewSteps into one list:
    const reviewComments = reviewSteps?.reduce((mergedStepComments, step) => {
      const stepComments =
        step.node.reviewCommentsByApplicationReviewStepId.edges;
      return [
        ...mergedStepComments,
        ...stepComments.map((step) => step.node.description)
      ];
    }, []);
    const status =
      application?.applicationRevisionStatus?.applicationRevisionStatus;

    if (!status) {
      router.push('/404');
      return null;
    }

    const changesRequested = status === 'REQUESTED_CHANGES';
    const hasBeenReviewed = status !== 'SUBMITTED' && status !== 'DRAFT';

    const thisVersion = Number(router.query.versionNumber);
    const latestSubmittedRevision =
      application.latestSubmittedRevision?.versionNumber;
    const latestDraftRevision = application.latestDraftRevision?.versionNumber;

    const newerSubmissionExists = latestSubmittedRevision > thisVersion;
    if (this.state.newerDraftExists === undefined) {
      this.setState((state) => {
        return {
          ...state,
          newerDraftExists: latestDraftRevision > latestSubmittedRevision
        };;
      });
    }
    const latestSubmissionHref = getViewApplicationPageRoute(
      router.query.applicationId.toString(),
      latestSubmittedRevision
    );
    const viewLatestSubmissionButton = (
      <>
        <p style={{margin: '1rem 0'}}>
          <strong>Note:</strong> There is a more recently submitted version of
          this application.
        </p>
        <Link passHref href={latestSubmissionHref}>
          <Button variant="primary">View most recent submission</Button>
        </Link>
      </>
    );

    const newerDraftURL = `/reporter/application/${encodeURIComponent(
      this.props.router.query.applicationId.toString()
    )}`;
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

    const applicationInfo = (
      <div>
        Application ID: {application.rowId}
        <br />
        {thisVersion > 1 && (
          <>
            Version: {application.latestDraftRevision.versionNumber}
            <br />
          </>
        )}
        BC GHG ID: {application.facilityByFacilityId.bcghgid}
      </div>
    );

    return (
      <DefaultLayout
        showSubheader
        session={session}
        title="Summary of your application"
        titleControls={applicationInfo}
      >
        <Row>
          <Col md={12}>
            {newerSubmissionExists && (
              <Alert variant="secondary">
                {newerSubmissionExists && viewLatestSubmissionButton}
              </Alert>
            )}
            {hasBeenReviewed && (
              <>
                <ApplicationDecision
                  actionRequired={changesRequested && !newerSubmissionExists}
                  decision={status}
                  reviewComments={reviewComments}
                >
                  {changesRequested &&
                    !newerSubmissionExists &&
                    !this.state.newerDraftExists && (
                      <ReviseApplicationButton
                        application={query.application}
                      />
                    )}
                  {this.state.newerDraftExists &&
                    !newerSubmissionExists &&
                    resumeLatestDraftButton}
                </ApplicationDecision>
              </>
            )}
            <ApplicationDetails
              query={query}
              applicationRevision={
                application.applicationRevisionByStringVersionNumber
              }
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
