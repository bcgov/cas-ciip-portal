import React from 'react';
import {Row, Button, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faComments,
  faLock,
  faTimes,
  faHourglassHalf,
  faKey,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {graphql, createFragmentContainer} from 'react-relay';
import {CiipApplicationRevisionStatus} from 'applicationReviewQuery.graphql';
import {ApplicationReviewStepSelector_applicationReviewSteps} from '__generated__/ApplicationReviewStepSelector_applicationReviewSteps.graphql';
import {capitalize} from 'lib/text-transforms';

interface Props {
  applicationReviewSteps: ApplicationReviewStepSelector_applicationReviewSteps;
  selectedStep: string;
  onSelectStep: (stepId: string) => void;
  decisionOrChangeRequestStatus: CiipApplicationRevisionStatus;
  newerDraftExists: boolean;
  onDecisionOrChangeRequestAction: () => void;
  changeDecision?: () => void;
}

const DECISION_BS_VARIANT = {
  SUBMITTED: undefined,
  APPROVED: 'success',
  REJECTED: 'danger',
  REQUESTED_CHANGES: 'secondary'
};

const DECISION_ICON = {
  APPROVED: faCheck,
  REJECTED: faTimes,
  REQUESTED_CHANGES: faHourglassHalf
};

const DECISION_BUTTON_TEXT = {
  APPROVED: 'Application has been approved and applicant notified',
  REJECTED: 'Application has been rejected and applicant notified',
  REQUESTED_CHANGES: 'Changes have been requested and applicant notified'
};

export const ApplicationReviewStepSelector: React.FunctionComponent<Props> = ({
  applicationReviewSteps,
  selectedStep,
  onSelectStep,
  decisionOrChangeRequestStatus,
  newerDraftExists,
  onDecisionOrChangeRequestAction,
  changeDecision
}) => {
  const steps = applicationReviewSteps.edges;
  const allStepsAreComplete = steps.every((edge) => edge.node.isComplete);
  const decisionHasBeenMade = decisionOrChangeRequestStatus !== 'SUBMITTED';
  const decisionOrChangeRequestIsDisabled =
    !allStepsAreComplete || decisionHasBeenMade;
  const renderStepStatusIcon = (icon) => (
    <FontAwesomeIcon
      icon={icon}
      style={{
        position: 'absolute',
        left: '1.2rem',
        top: 'calc(50% - 0.5em)'
      }}
    />
  );
  const changeDecisionButton = (
    <Button variant="link" onClick={changeDecision}>
      <FontAwesomeIcon icon={faKey} style={{marginRight: 8}} />
      Change decision
    </Button>
  );
  const newDraftIndicator = (
    <Button
      variant="link"
      disabled
      style={{opacity: 1, color: '#343a40', textAlign: 'left'}}
    >
      <FontAwesomeIcon icon={faLock} style={{marginRight: 8}} />
      There is a newer draft of this application.
    </Button>
  );
  return (
    <Row>
      <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10">
        <ListGroup as="ul" id="selector">
          {steps.map((edge) => {
            const {reviewStepId, isComplete} = edge.node;
            const isSelectedStep = edge.node.id === selectedStep;
            const callToAction = `${isComplete ? '' : 'Open'} ${capitalize(
              edge.node.reviewStepByReviewStepId.stepName
            )} review ${isComplete ? 'completed' : ''}`;
            return (
              <ListGroup.Item
                className="review-step-option"
                as="li"
                action
                tabIndex={0}
                key={reviewStepId}
                active={isSelectedStep}
                onClick={() => onSelectStep(edge.node.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelectStep(edge.node.id);
                }}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  paddingLeft: '3rem'
                }}
              >
                {renderStepStatusIcon(isComplete ? faCheck : faComments)}
                {callToAction}
              </ListGroup.Item>
            );
          })}
          <ListGroup.Item
            id="open-decision-dialog"
            as="li"
            action
            active={!decisionOrChangeRequestIsDisabled}
            key="decision"
            tabIndex={0}
            variant={DECISION_BS_VARIANT[decisionOrChangeRequestStatus]}
            style={{cursor: 'pointer', paddingLeft: '3rem'}}
            disabled={decisionOrChangeRequestIsDisabled}
            aria-disabled={decisionOrChangeRequestIsDisabled}
            onClick={() => {
              if (!decisionOrChangeRequestIsDisabled)
                onDecisionOrChangeRequestAction();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !decisionOrChangeRequestIsDisabled)
                onDecisionOrChangeRequestAction();
            }}
          >
            {decisionHasBeenMade && (
              <FontAwesomeIcon
                icon={DECISION_ICON[decisionOrChangeRequestStatus]}
                style={{
                  position: 'absolute',
                  left: '1.2rem',
                  top: 'calc(50% - 0.5em)'
                }}
              />
            )}
            {decisionHasBeenMade &&
              DECISION_BUTTON_TEXT[decisionOrChangeRequestStatus]}
            {!decisionHasBeenMade &&
              (decisionOrChangeRequestIsDisabled ? (
                <em>
                  Complete the reviews above to make a decision or request
                  changes
                </em>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{
                      position: 'absolute',
                      left: '1.2rem',
                      top: 'calc(50% - 0.5em)'
                    }}
                  />
                  Make a decision or request changes
                </>
              ))}
          </ListGroup.Item>
        </ListGroup>
      </div>
      {changeDecision && (
        <div
          id="change-decision"
          className="col-md-12 col-lg-4 col-xl-5 col-xxl-6"
        >
          {newerDraftExists ? newDraftIndicator : changeDecisionButton}
        </div>
      )}
      <style jsx>{`
        #change-decision {
          display: flex;
          align-items: flex-end;
        }
      `}</style>
      <style jsx global>{`
        #selector .list-group-item.active {
          z-index: auto;
          background: #38598a;
        }
        .list-group-item#open-decision-dialog.active {
          background: #036;
        }
        #selector .list-group-item-danger.disabled,
        .list-group-item-danger:disabled {
          color: #721c24;
          background-color: #f5c6cb;
        }
        #selector .list-group-item-success.disabled,
        .list-group-item-success:disabled {
          color: #155724;
          background-color: #c3e6cb;
        }
        #selector .list-group-item-secondary.disabled,
        .list-group-item-secondary:disabled {
          color: #383d41;
          background-color: #d6d8db;
        }
      `}</style>
    </Row>
  );
};

export default createFragmentContainer(ApplicationReviewStepSelector, {
  applicationReviewSteps: graphql`
    fragment ApplicationReviewStepSelector_applicationReviewSteps on ApplicationReviewStepsConnection {
      edges {
        node {
          id
          isComplete
          reviewStepId
          reviewStepByReviewStepId {
            stepName
          }
        }
      }
    }
  `
});
