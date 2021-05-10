import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {ApplicationIdReviewQueryResponse} from 'ApplicationIdReviewQuery.graphql';
import {Row, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import IncentiveCalculatorContainer from 'containers/Incentives/IncentiveCalculatorContainer';
import {CiipApplicationRevisionStatus} from 'analystCreateApplicationRevisionStatusMutation.graphql';
import analystCreateApplicationRevisionStatusMutation from 'mutations/application/analystCreateApplicationRevisionStatusMutation';
import DefaultLayout from 'layouts/default-layout';
import ApplicationDetails from 'containers/Applications/ApplicationDetailsContainer';
import {CiipPageComponentProps} from 'next-env';
import getConfig from 'next/config';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';
import ApplicationReviewStepSelector from 'containers/Admin/ApplicationReview/ApplicationReviewStepSelector';
import ReviewSidebar from 'containers/Admin/ApplicationReview/ReviewSidebar';
import DecisionModal from 'components/Admin/ApplicationReview/DecisionModal';
import HelpButton from 'components/helpers/HelpButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import ApplicationReviewValidationContainer from 'containers/Applications/ApplicationReviewValidationContainer';

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};
const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props extends CiipPageComponentProps {
  query: ApplicationIdReviewQueryResponse['query'];
}

interface State {
  selectedReviewStepId: string;
  isSidebarOpened: boolean;
}

class ApplicationReview extends Component<Props, State> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query ApplicationIdReviewQuery($applicationId: ID!) {
      query {
        session {
          userGroups
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          rowId
          facilityByFacilityId {
            bcghgid
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
          applicationRevision: latestSubmittedRevision {
            id
            versionNumber
            isCurrentVersion
            applicationRevisionStatus {
              id
              applicationRevisionStatus
            }
            ...ApplicationDetailsContainer_applicationRevision
            ...IncentiveCalculatorContainer_applicationRevision
            ...ApplicationReviewValidationContainer_applicationRevision
          }
        }
        ...ApplicationDetailsContainer_query
        ...ApplicationDetailsContainer_diffQuery
          @arguments(applicationId: $applicationId)
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
    const applicationId = this.props.query.application.rowId;
    const {versionNumber} = this.props.query.application.applicationRevision;
    const variables = {
      input: {
        applicationRevisionStatus: {
          applicationId,
          applicationRevisionStatus: decision,
          versionNumber
        }
      }
    };
    await analystCreateApplicationRevisionStatusMutation(
      this.props.relayEnvironment,
      variables
    );
  }
  render() {
    const {query, router} = this.props;
    const {application} = query;
    if (!application) {
      router.push('/404');
      return null;
    }

    const {
      isCurrentVersion,
      versionNumber
    } = application.applicationRevision;
    const {bcghgid} = application.facilityByFacilityId;
    const {
      applicationRevisionStatus
    } = application.applicationRevision.applicationRevisionStatus;
    const {session} = query || {};
    const isUserAdmin = session.userGroups.some((groupConst) =>
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
            <div id="title" className="col-xxl-6 col-xl-7 col-lg-8 col-md-10">
              <h1>{`Application #${query.application.rowId}`}</h1>
              <p>
                {versionNumber > 1 && (
                  <span id="revised-tag">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{marginRight: '0.5em'}}
                    />
                    Revised: version {versionNumber}
                  </span>
                )}
                <span>BC GHG ID: {bcghgid}</span>
              </p>
            </div>
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
            <ApplicationReviewValidationContainer
              applicationRevision={query.application.applicationRevision}
            />
            <hr />
            <ApplicationDetails
              review
              query={query}
              diffQuery={query}
              applicationRevision={query.application.applicationRevision}
              liveValidate={false}
            />
            <IncentiveCalculatorContainer
              applicationRevision={query.application.applicationRevision}
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
        <style jsx>{`
          h1 {
            margin-bottom: 0.75rem;
          }
          #title {
            margin-bottom: 20px;
            padding-left: 0;
          }
          #title p {
            display: flex;
            align-items: center;
            line-height: 2rem;
            color: #555;
          }
          #revised-tag {
            flex-shrink: 0;
            margin-right: 1rem;
            color: #0053b3;
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            line-height: 1.5;
            border: 1px solid currentColor;
            border-radius: 0.2rem;
          }
          :global(button#to-top) {
            border-radius: 50%;
            position: fixed;
            bottom: 0.6rem;
            left: 0.6rem;
            width: 50px;
            height: 50px;
            box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default ApplicationReview;
