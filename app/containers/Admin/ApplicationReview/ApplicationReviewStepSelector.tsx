import React from 'react';
import {Row, Col, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {graphql, createFragmentContainer} from 'react-relay';
import {ApplicationReviewStepSelector_applicationReviewSteps} from '__generated__/ApplicationReviewStepSelector_applicationReviewSteps.graphql';
import {capitalize} from 'lib/text-transforms';

interface Props {
  applicationReviewSteps: ApplicationReviewStepSelector_applicationReviewSteps;
  selectedStep: string;
  onSelectStep: (stepId: string) => void;
}

export const ApplicationReviewStepSelector: React.FunctionComponent<Props> = ({
  applicationReviewSteps,
  selectedStep,
  onSelectStep
}) => {
  const steps = applicationReviewSteps.edges;
  return (
    <Row>
      <Col md={5}>
        <ListGroup as="ul">
          {steps.map((edge) => {
            const {reviewStepId, isComplete} = edge.node;
            const isSelectedStep = edge.node.id === selectedStep;
            const callToAction = `${isComplete ? '' : 'Open'} ${capitalize(
              edge.node.reviewStepByReviewStepId.stepName
            )} review ${isComplete ? 'completed' : ''}`;
            return (
              <ListGroup.Item
                as="li"
                action
                tabIndex={0}
                key={reviewStepId}
                aria-selected={isSelectedStep}
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
                {isComplete && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{
                      position: 'absolute',
                      left: '1.2rem',
                      top: 'calc(50% - 0.5em)'
                    }}
                  />
                )}
                {callToAction}
              </ListGroup.Item>
            );
          })}
          <ListGroup.Item
            as="li"
            action
            key="decision"
            tabIndex={0}
            disabled
            aria-disabled
            style={{cursor: 'pointer', paddingLeft: '3rem'}}
          >
            Make a decision or request changes
          </ListGroup.Item>
        </ListGroup>
      </Col>
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
