import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Modal, Row} from 'react-bootstrap';

interface Props {
  inactivityDelaySeconds: number;
  expiresOn: number;
  onExtendSession: () => void;
}

const LogoutWarningModal: React.FunctionComponent<Props> = ({
  inactivityDelaySeconds,
  expiresOn,
  onExtendSession
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.floor((expiresOn - Date.now()) / 1000)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds(Math.floor((expiresOn - Date.now()) / 1000));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Modal show size="lg">
      <Modal.Header className="h4">Inactivity Logout Warning</Modal.Header>
      <Modal.Body style={{padding: '2em'}}>
        <Container>
          <Row>
            Your session is about to expire due to inactivity over{' '}
            {Math.floor(inactivityDelaySeconds / 60)} minutes.
          </Row>
          <Row>You will be logged out in {remainingSeconds} seconds.</Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Form action="/logout" method="post">
          <button type="submit" className="btn btn-secondary">
            Logout
          </button>
        </Form>
        <Button onClick={onExtendSession}>Remain active</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutWarningModal;
