import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';
import {Row, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import IncentiveCalculatorContainer from 'containers/Incentives/IncentiveCalculatorContainer';
import ApplicationRevisionStatusContainer from 'containers/Applications/ApplicationRevisionStatusContainer';
import DefaultLayout from 'layouts/default-layout';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationOverrideNotification from 'components/Application/ApplicationOverrideNotificationCard';
import {CiipPageComponentProps} from 'next-env';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';
import ReviewSidebar from 'containers/Admin/ApplicationReview/ReviewSidebar';
import HelpButton from 'components/helpers/HelpButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';

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
                ...ReviewSidebar_applicationReviewStep
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
  state = {isSidebarOpened: false};

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
      <DefaultLayout
        session={session}
        width="wide"
        fixedHeader
        disableHelpButton
      >
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
            <OverlayTrigger
              placement="top"
              overlay={(props) => (
                <Tooltip id="scroll-to-top" {...props}>
                  Return to top of page
                </Tooltip>
              )}
            >
              <Button
                id="to-top"
                variant="dark"
                type="button"
                onClick={() => {
                  const main = document.body.getElementsByTagName('main')[0];
                  main?.scrollIntoView();
                }}
                style={{
                  borderRadius: '50%',
                  position: 'fixed',
                  bottom: '0.6rem',
                  left: '0.6rem',
                  width: 50,
                  height: 50,
                  boxShadow:
                    '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4)'
                }}
              >
                <FontAwesomeIcon size="lg" icon={faArrowUp} />
              </Button>
            </OverlayTrigger>
          </div>
          {this.state.isSidebarOpened && (
            <ReviewSidebar
              applicationReviewStep={
                query.application.applicationReviewStepsByApplicationId.edges[0]
                  .node
              }
              onClose={this.toggleSidebar}
            />
          )}
          {!this.state.isSidebarOpened && <HelpButton isInternalUser />}
        </Row>
      </DefaultLayout>
    );
  }
}

export default ApplicationReview;
