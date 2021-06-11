import React from 'react';
import {Button, Form, Modal, Container, Col, Row, Alert} from 'react-bootstrap';

interface Props {
  validated: boolean;
  onSubmit: (form: any) => Promise<void>;
  show: boolean;
  onClose: () => void;
  showActiveCodeError: boolean;
  disabled?: boolean;
}

export const CreateNaicsCodeModal: React.FunctionComponent<Props> = ({
  validated,
  onSubmit,
  show,
  onClose,
  showActiveCodeError,
  disabled
}) => {
  const submitForm: (e: React.SyntheticEvent<any>) => void = async (e) => {
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
    e.persist();

    await onSubmit(e.target);
    onClose();
  };

  return (
    <>
      <Modal
        centered
        size="lg"
        show={show}
        onHide={() => onClose()}
        aria-modal="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>New NAICS Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form noValidate validated={validated} onSubmit={submitForm}>
              <fieldset disabled={disabled}>
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
                {showActiveCodeError && (
                  <Alert variant="danger">
                    This NAICS code already exists. Please delete the currently
                    active code before entering new information
                  </Alert>
                )}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </fieldset>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      <style jsx global>{`
        .modal-header {
          color: white;
          background: #003366;
        }
        .modal-body {
          background: #f5f5f5;
        }
        .close {
          color: white;
        }
      `}</style>
    </>
  );
};

export default CreateNaicsCodeModal;
