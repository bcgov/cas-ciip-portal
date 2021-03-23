import React from 'react';
import {Button, Form, Modal, Container, Col, Row} from 'react-bootstrap';

interface Props {
  validated: boolean;
  handleCreateNaicsCode: (e: React.SyntheticEvent<any>) => Promise<void>;
  showCreateModal: boolean;
  setShowCreateModal: (x: boolean) => void;
}

export const CreateNaicsCodeModal: React.FunctionComponent<Props> = ({
  validated,
  handleCreateNaicsCode,
  showCreateModal,
  setShowCreateModal
}) => {
  return (
    <Modal
      centered
      size="lg"
      show={showCreateModal}
      onHide={() => setShowCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>New NAICS Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleCreateNaicsCode}
          >
            <Row>
              <Col md={4}>
                <Form.Group controlId="naicsCode">
                  <Form.Label>NAICS Code</Form.Label>
                  <Form.Control required type="text" />
                  <Form.Control.Feedback type="invalid">
                    NAICS Code is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group controlId="ciipSector">
                  <Form.Label>CIIP Sector</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="naicsDescription">
              <Form.Label>NAICS Description</Form.Label>
              <Form.Control required type="text" />
              <Form.Control.Feedback type="invalid">
                NAICS Description is required
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNaicsCodeModal;
