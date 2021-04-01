import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';
import {Row} from 'react-bootstrap';
import IncentiveCalculatorContainer from 'containers/Incentives/IncentiveCalculatorContainer';
import ApplicationRevisionStatusContainer from 'containers/Applications/ApplicationRevisionStatusContainer';
import DefaultLayout from 'layouts/default-layout';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationOverrideNotification from 'components/Application/ApplicationOverrideNotificationCard';
import {CiipPageComponentProps} from 'next-env';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';
import ReviewSidebar from 'containers/Admin/ApplicationReview/ReviewSidebar';

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
          applicationReviewStepsByApplicationId {
            edges {
              node {
                internalComments: reviewCommentsByApplicationReviewStepId(
                  filter: {
                    commentType: {equalTo: INTERNAL}
                    deletedAt: {isNull: true}
                  }
                ) {
                  edges {
                    node {
                      ...ReviewSidebar_internalComments
                    }
                  }
                }
                generalComments: reviewCommentsByApplicationReviewStepId(
                  filter: {
                    commentType: {equalTo: GENERAL}
                    deletedAt: {isNull: true}
                  }
                ) {
                  edges {
                    node {
                      ...ReviewSidebar_internalComments
                    }
                  }
                }
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
  state = {isSidebarOpened: false, currentStepIsCompleted: false};

  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  toggleSidebar() {
    this.setState((state: {isSidebarOpened: boolean}) => {
      return {isSidebarOpened: !state.isSidebarOpened};
    });
  }

  render() {
    const {query} = this.props;
    const {overrideJustification} = query?.applicationRevision;
    const {session} = query || {};

    return (
      <DefaultLayout session={session} width="wide" fixedHeader>
        <Row className="application-container">
          <div
            id="application-body"
            className={`
             col-md-${this.state.isSidebarOpened ? 7 : 10}
             col-lg-${this.state.isSidebarOpened ? 8 : 10}
             col-xxl-${this.state.isSidebarOpened ? 9 : 10}
             offset-md-${this.state.isSidebarOpened ? 0 : 1}
             offset-lg-${this.state.isSidebarOpened ? 0 : 1}`}
          >
            <ApplicationRevisionStatusContainer
              applicationRevisionStatus={query.application.reviewRevisionStatus}
              applicationRowId={query.application.rowId}
            />
            <button type="button" onClick={this.toggleSidebar}>
              Click to toggle review comments
            </button>
            <ApplicationOverrideNotification
              overrideJustification={overrideJustification}
            />
            <hr />
            <ApplicationDetails
              review
              query={query}
              application={query.application}
              liveValidate={false}
            />
            <IncentiveCalculatorContainer
              applicationRevision={query.applicationRevision}
            />
          </div>
          {this.state.isSidebarOpened && (
            <ReviewSidebar
              internalComments={query.application.internalComments}
              generalComments={query.application.generalComments}
              reviewStep="Technical"
              isCompleted={this.state.currentStepIsCompleted}
              onClose={this.toggleSidebar}
              onCompletionToggle={(isCompleted) => {
                this.setState((state) => {
                  return {
                    ...state,
                    currentStepIsCompleted: isCompleted
                  };
                });
                console.log('implement me properly in 2293');
              }}
            />
          )}
        </Row>
        <style jsx global>{`
          #help-button {
            right: 500px !important;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default ApplicationReview;
