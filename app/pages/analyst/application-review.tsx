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
import getConfig from 'next/config';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';
import ApplicationReviewStepSelector from 'containers/Admin/ApplicationReview/ApplicationReviewStepSelector';
import ReviewSidebar from 'containers/Admin/ApplicationReview/ReviewSidebar';
import HelpButton from 'components/helpers/HelpButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};
const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props extends CiipPageComponentProps {
  query: applicationReviewQueryResponse['query'];
}

interface State {
  selectedReviewStepId: string;
  isSidebarOpened: boolean;
}

class ApplicationReview extends Component<Props, State> {
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
          userGroups
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          rowId
          reviewRevisionStatus: applicationRevisionStatus(
            versionNumberInput: $version
          ) {
            applicationRevisionStatus
            ...ApplicationRevisionStatusContainer_applicationRevisionStatus
          }
          applicationReviewStepsByApplicationId {
            edges {
              node {
                id
                ...ReviewSidebar_applicationReviewStep
              }
            }
            ...ApplicationReviewStepSelector_applicationReviewSteps
          }
        }
        applicationRevision(id: $applicationRevisionId) {
          ...ApplicationDetailsContainer_applicationRevision
          overrideJustification
          ...IncentiveCalculatorContainer_applicationRevision
        }
        ...ApplicationDetailsContainer_query
        ...ApplicationDetailsContainer_diffQuery
          @arguments(applicationId: $applicationId, newVersion: $version)
      }
    }
  `;
  state = {isSidebarOpened: false, selectedReviewStepId: null};

  constructor(props) {
    super(props);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.selectReviewStep = this.selectReviewStep.bind(this);
    this.findStepById = this.findStepById.bind(this);
  }
  closeSidebar() {
    this.setState((state) => {
      return {
        ...state,
        selectedReviewStepId: null,
        isSidebarOpened: false
      };
    });
  }
  findStepById(stepId) {
    return this.props.query.application.applicationReviewStepsByApplicationId.edges.find(
      (edge) => {
        return edge.node.id === stepId;
      }
    )?.node;
  }
  selectReviewStep(appReviewStepId: string) {
    this.setState((state) => {
      return {
        ...state,
        selectedReviewStepId: appReviewStepId,
        isSidebarOpened: true
      };
    });
  }
  render() {
    const {query} = this.props;
    const {overrideJustification} = query?.applicationRevision;
    const {applicationRevisionStatus} = query?.application.reviewRevisionStatus;
    const {session} = query || {};
    const isUserAdmin = query?.session.userGroups.some((groupConst) =>
      ADMIN_GROUP.includes(groupConst)
    );
    const currentReviewIsFinalized =
      this.props.query?.application.reviewRevisionStatus
        .applicationRevisionStatus !== 'SUBMITTED';

    const handleChangeDecision = () => {
      console.log(
        'implement me in 2294 - should open the decision dialog with admin-only option to revert (to SUBMITTED status)'
      );
    };

    return (
      <DefaultLayout
        session={session}
        width="wide"
        fixedHeader
        disableHelpButton
      >
        <Row>
          <div
            id="application-body"
            className={`
             col-md-${this.state.isSidebarOpened ? 7 : 10}
             col-lg-${this.state.isSidebarOpened ? 8 : 10}
             col-xxl-${this.state.isSidebarOpened ? 9 : 10}
             offset-md-${this.state.isSidebarOpened ? 0 : 1}
             offset-lg-${this.state.isSidebarOpened ? 0 : 1}`}
          >
            <h1>
              {`Application #${query.application.rowId}`}
              <ApplicationRevisionStatusContainer
                applicationRevisionStatus={
                  query.application.reviewRevisionStatus
                }
                applicationRowId={query.application.rowId}
              />
            </h1>
            <ApplicationReviewStepSelector
              applicationReviewSteps={
                query.application.applicationReviewStepsByApplicationId
              }
              decisionOrChangeRequestStatus={applicationRevisionStatus}
              onDecisionOrChangeRequestAction={() =>
                console.log('implement me in 2294')
              }
              selectedStep={this.state.selectedReviewStepId}
              onSelectStep={this.selectReviewStep}
              changeDecision={
                isUserAdmin && currentReviewIsFinalized
                  ? handleChangeDecision
                  : undefined
              }
            />
            <ApplicationOverrideNotification
              overrideJustification={overrideJustification}
            />
            <hr />
            <ApplicationDetails
              review
              query={query}
              diffQuery={query}
              applicationRevision={query.applicationRevision}
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
                aria-label="Return to top of page"
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
              applicationReviewStep={this.findStepById(
                this.state.selectedReviewStepId
              )}
              isFinalized={currentReviewIsFinalized}
              onClose={this.closeSidebar}
              headerOffset={runtimeConfig.SITEWIDE_NOTICE ? 108 : undefined}
            />
          )}
          {!this.state.isSidebarOpened && <HelpButton isInternalUser />}
        </Row>
        <style jsx global>{`
          h1 {
            margin-bottom: 20px;
          }
          .list-group-item.active {
            z-index: auto;
            background: #38598a;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default ApplicationReview;
