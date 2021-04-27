import React from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {DecisionModal_applicationRevisionStatus} from '__generated__/DecisionModal_applicationRevisionStatus.graphql';
import createApplicationRevisionStatusMutation from 'mutations/application/createApplicationRevisionStatusMutation';
import {CiipApplicationRevisionStatus} from 'createApplicationRevisionStatusMutation.graphql';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import ModalSharedStyles from 'components/ModalSharedStyles';

interface Props {
  show: boolean;
  onHide: () => void;
  onDecision: () => void;
  relay: RelayProp;
  applicationRevisionStatus: DecisionModal_applicationRevisionStatus;
}

export const DecisionModal: React.FunctionComponent<Props> = ({
  show,
  onHide,
  onDecision,
  relay,
  applicationRevisionStatus
}) => {
  const {applicationId, versionNumber} = applicationRevisionStatus;

  const saveDecision = async (decision) => {
    onDecision();
    const variables = {
      input: {
        applicationRevisionStatus: {
          applicationId,
          applicationRevisionStatus: decision as CiipApplicationRevisionStatus,
          versionNumber
        }
      }
    };
    await createApplicationRevisionStatusMutation(relay.environment, variables);
  };
  const makeDecisionContent = (
    <>
      <Modal.Body>
        <p>
          Once a decision is made or changes are requested, general comments
          will become visible to the applicant, who will be{' '}
          <strong>immediately notified of the decision by email</strong>.
        </p>
        <p className="d-flex justify-content-center">
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={() => saveDecision('REQUESTED_CHANGES')}
          >
            <FontAwesomeIcon icon={faEnvelope} style={{marginRight: '0.5em'}} />
            Request Changes
          </Button>
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-around">
        <Button
          variant="success"
          size="lg"
          onClick={() => saveDecision('APPROVED')}
        >
          <FontAwesomeIcon icon={faCheck} />
          Approve
        </Button>
        <strong>OR</strong>
        <Button
          variant="danger"
          size="lg"
          onClick={() => saveDecision('REJECTED')}
        >
          <FontAwesomeIcon icon={faTimes} />
          Reject
        </Button>
      </Modal.Footer>
    </>
  );
  return (
    <Modal show={show} centered size="lg" onHide={onHide}>
      <Modal.Header closeButton>
        <h2>Make a Decision or Request Changes</h2>
      </Modal.Header>
      {makeDecisionContent}
      <style jsx>{ModalSharedStyles}</style>
      <style jsx>{`
        :global(.modal-body) {
          padding: 2rem 2rem 1rem 2rem;
        }
        :global(.btn svg.svg-inline--fa) {
          margin-right: 0.5em;
        }
      `}</style>
    </Modal>
  );
};

export default createFragmentContainer(DecisionModal, {
  applicationRevisionStatus: graphql`
    fragment DecisionModal_applicationRevisionStatus on ApplicationRevisionStatus {
      applicationId
      versionNumber
    }
  `
});
