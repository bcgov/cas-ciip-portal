import React from 'react';
import {Modal, Button, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import ModalSharedStyles from 'components/ModalSharedStyles';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';

interface Props {
  show: boolean;
  onHide: () => void;
  onDecision: (decision: string) => void;
  currentStatus: string;
}

export const DecisionModal: React.FunctionComponent<Props> = ({
  show,
  onHide,
  onDecision,
  currentStatus
}) => {
  const decisionHasBeenMade = currentStatus !== 'SUBMITTED';
  const title = decisionHasBeenMade
    ? `Revert Decision`
    : 'Make a Decision or Request Changes';

  const handleDecision = (e) => {
    onDecision(e.target.value);
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
            value="REQUESTED_CHANGES"
            variant="outline-secondary"
            size="lg"
            onClick={handleDecision}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Request Changes
          </Button>
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-around">
        <Button
          value="APPROVED"
          variant="success"
          size="lg"
          onClick={handleDecision}
        >
          <FontAwesomeIcon icon={faCheck} />
          Approve
        </Button>
        <strong>OR</strong>
        <Button
          value="REJECTED"
          variant="danger"
          size="lg"
          onClick={handleDecision}
        >
          <FontAwesomeIcon icon={faTimes} />
          Reject
        </Button>
      </Modal.Footer>
    </>
  );
  const revertDecisionContent = (
    <>
      <Modal.Body>
        <p>
          The applicant was notified by email of the following decision:{' '}
          <strong>{getUserFriendlyStatusLabel(currentStatus)}</strong>
        </p>
        <p>Would you like to revert this decision?</p>
        <p>
          Doing so will change this application&apos;s status back to{' '}
          <strong>Submitted</strong> and you will have the opportunity to make
          further changes to the review before making a new decision or
          requesting changes.
        </p>
        {currentStatus === 'REQUESTED_CHANGES' && (
          <Alert variant="secondary">
            <strong>Note:</strong> If the applicant begins drafting a new
            revision of the application, it will no longer be possible to revert
            a decision of <strong>Changes requested</strong>.
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button value="SUBMITTED" onClick={handleDecision}>
          Revert Decision
        </Button>
      </Modal.Footer>
    </>
  );
  return (
    <Modal
      show={show}
      centered
      size="lg"
      onHide={onHide}
      aria-labelledby="heading"
    >
      <Modal.Header closeButton>
        <h2 id="heading">{title}</h2>
      </Modal.Header>
      {!decisionHasBeenMade && makeDecisionContent}
      {decisionHasBeenMade && revertDecisionContent}
      <style jsx>{ModalSharedStyles}</style>
      <style jsx>{`
        :global(.modal-body) {
          padding: 2rem;
        }
        :global(.btn svg.svg-inline--fa) {
          margin-right: 0.5em;
        }
      `}</style>
    </Modal>
  );
};

export default DecisionModal;
