import React from 'react';
import {Button, Modal} from 'react-bootstrap';

interface Props {
  inactivityDelaySeconds: number;
  remainingSeconds: number;
  onLogout: () => void;
  onExtendSession: () => void;
}

const LogoutWarningModal: React.FunctionComponent<Props> = ({
  inactivityDelaySeconds,
  remainingSeconds,
  onLogout,
  onExtendSession
}) => {
  return (
    <Modal show size="lg" onHide={() => {}}>
      <Modal.Header className="h4">Inactivity Logout Warning</Modal.Header>
      <Modal.Body style={{padding: '2em'}}>
        Your session is about to expire due to inactivity over{' '}
        {inactivityDelaySeconds / 60} minutes.
        <br />
        You will be logged out in {remainingSeconds} seconds.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onLogout()}>
          Logout
        </Button>
        <Button onClick={() => onExtendSession()}>Remain active</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutWarningModal;
