import React, {useState} from 'react';
import {Row, Col, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ApplicationReviewStepSelector_applicationReviewSteps} from '__generated__/ApplicationReviewStepSelector_applicationReviewSteps.graphql';
import updateApplicationReviewStepMutation from 'mutations/application_review_step/updateApplicationReviewStepMutation';
import {capitalize} from 'lib/text-transforms';

interface Props {
  applicationReviewSteps: ApplicationReviewStepSelector_applicationReviewSteps;
  relay: RelayProp;
  selectedStep: ApplicationReviewStepSelector_applicationReviewSteps['edges']['node'];
  onSelectStep: (
    step: ApplicationReviewStepSelector_applicationReviewSteps['edges']['node']
  ) => void;
}

export const ApplicationReviewStepSelector: React.FunctionComponent<Props> = ({
  applicationReviewSteps,
  relay,
  selectedStep,
  onSelectStep
}) => {
  const steps = applicationReviewSteps.edges;
  console.log('selector: selected step is ', selectedStep);
  return (
    <Row>
      <Col md={5}>
        <ListGroup as="ul" role="listbox">
          {steps.map((edge) => {
            const {reviewStepId} = edge.node;
            const isSelectedStep = edge.node === selectedStep;
            return (
              <ListGroup.Item
                as="li"
                role="option"
                tabIndex={0}
                key={reviewStepId}
                aria-selected={isSelectedStep}
                active={isSelectedStep}
                onClick={() => onSelectStep(edge.node)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelectStep(edge.node);
                }}
                style={{cursor: 'pointer'}}
              >
                {capitalize(edge.node.reviewStepByReviewStepId.stepName)}
              </ListGroup.Item>
            );
          })}
          <ListGroup.Item
            as="li"
            role="option"
            key="decision"
            tabIndex={0}
            disabled
            aria-disabled
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
