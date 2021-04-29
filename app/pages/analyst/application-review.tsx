import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';
import {Row, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import IncentiveCalculatorContainer from 'containers/Incentives/IncentiveCalculatorContainer';
import {CiipApplicationRevisionStatus} from 'createApplicationRevisionStatusEdgeMutation.graphql';
import createApplicationRevisionStatusEdgeMutation from 'mutations/application/createApplicationRevisionStatusEdgeMutation';
import DefaultLayout from 'layouts/default-layout';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationOverrideNotification from 'components/Application/ApplicationOverrideNotificationCard';
import {CiipPageComponentProps} from 'next-env';
import getConfig from 'next/config';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';
import ApplicationReviewStepSelector from 'containers/Admin/ApplicationReview/ApplicationReviewStepSelector';
import ReviewSidebar from 'containers/Admin/ApplicationReview/ReviewSidebar';
import DecisionModal from 'components/Admin/ApplicationReview/DecisionModal';
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
          id
          overrideJustification
          isCurrentVersion
          statusesSincePageLoad: applicationRevisionStatusesByApplicationIdAndVersionNumber(
            last: 1
          )
            @connection(
              key: "ApplicationReview_statusesSincePageLoad"
              filters: []
            ) {
            edges {
              node {
                applicationRevisionStatus
              }
            }
          }
          ...ApplicationDetailsContainer_applicationRevision
          ...IncentiveCalculatorContainer_applicationRevision
        }
        ...ApplicationDetailsContainer_query
        ...ApplicationDetailsContainer_diffQuery
          @arguments(applicationId: $applicationId, newVersion: $version)
      }
    }
  `;
  state = {
    isSidebarOpened: false,
    selectedReviewStepId: null,
    showDecisionModal: false
  };

  constructor(props) {
    super(props);
    this.openDecisionModal = this.openDecisionModal.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.closeDecisionModal = this.closeDecisionModal.bind(this);
    this.selectReviewStep = this.selectReviewStep.bind(this);
    this.findStepById = this.findStepById.bind(this);
  }
  openDecisionModal() {
    this.setState((state) => {
      return {...state, showDecisionModal: true};
    });
  }
  closeDecisionModal() {
    this.setState((state) => {
      return {...state, showDecisionModal: false};
    });
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
  async saveDecision(decision: CiipApplicationRevisionStatus) {
    const variables = {
      input: {
        applicationRevisionStatus: {
          applicationId: this.props.query.application.rowId,
          applicationRevisionStatus: decision as CiipApplicationRevisionStatus,
          versionNumber: 1
        }
      }
    };
    await createApplicationRevisionStatusEdgeMutation(
      this.props.relayEnvironment,
      variables,
      this.props.query.applicationRevision.id,
      'ApplicationReview_statusesSincePageLoad'
    );
  }
  render() {
    const {query} = this.props;
    const {
      overrideJustification,
      isCurrentVersion
    } = query?.applicationRevision;
    const statusesLength =
      query?.applicationRevision.statusesSincePageLoad.edges.length;
    const {
      applicationRevisionStatus
    } = query?.applicationRevision.statusesSincePageLoad.edges[
      statusesLength - 1
    ].node;
    const {session} = query || {};
    const isUserAdmin = query?.session.userGroups.some((groupConst) =>
      ADMIN_GROUP.includes(groupConst)
    );
    const currentReviewIsFinalized = applicationRevisionStatus !== 'SUBMITTED';

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
            </h1>
            <ApplicationReviewStepSelector
              applicationReviewSteps={
                query.application.applicationReviewStepsByApplicationId
              }
              decisionOrChangeRequestStatus={applicationRevisionStatus}
              onDecisionOrChangeRequestAction={this.openDecisionModal}
              selectedStep={this.state.selectedReviewStepId}
              onSelectStep={this.selectReviewStep}
              newerDraftExists={!isCurrentVersion}
              changeDecision={
                isUserAdmin && currentReviewIsFinalized
                  ? this.openDecisionModal
                  : undefined
              }
            />
            <Row style={{marginTop: 30}}>
              <ApplicationOverrideNotification
                overrideJustification={overrideJustification}
              />
            </Row>
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
          <DecisionModal
            currentStatus={applicationRevisionStatus}
            show={this.state.showDecisionModal}
            onDecision={(decision) => {
              this.saveDecision(decision as CiipApplicationRevisionStatus);
              this.closeDecisionModal();
            }}
            onHide={this.closeDecisionModal}
          />
        </Row>
        <style jsx global>{`
          h1 {
            margin-bottom: 20px;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default ApplicationReview;
