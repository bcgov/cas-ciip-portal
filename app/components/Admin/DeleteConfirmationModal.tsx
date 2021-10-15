import LoadingOnClickButton from "components/helpers/LoadingOnClickButton";
import React from "react";
import { Button, Modal, Alert, Col, Row } from "react-bootstrap";

interface Props {
  deleteObject: {
    deleteName: string;
    deleteItem: string;
    deleteItemDescription: string;
  };
  handleDelete: (e: React.SyntheticEvent<any>) => Promise<void>;
  show: boolean;
  onClose: () => void;
}

export const DeleteConfirmationModal: React.FunctionComponent<Props> = ({
  deleteObject,
  handleDelete,
  show,
  onClose,
}) => {
  return (
    <Modal centered show={show} onHide={() => onClose()} aria-modal="true">
      <Modal.Header>
        <Modal.Title style={{ margin: "auto" }}>
          Delete {deleteObject.deleteName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <Alert variant="danger">
          <p>Are you sure you want to delete this {deleteObject.deleteName}?</p>
          <p>
            Doing so will immediately remove it as an option for in-progress
            applications and those not yet started. Submitted applications will
            not be affected.
          </p>
        </Alert>
        <h5>{deleteObject.deleteItem}</h5>
        <p>{deleteObject.deleteItemDescription}</p>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <LoadingOnClickButton
              onClick={handleDelete}
              variant="danger"
              loadingText="Deleting..."
            >
              Confirm Delete
            </LoadingOnClickButton>
          </Col>
          <Col md={{ span: 3, offset: 1 }}>
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationModal;
