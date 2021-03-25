import React from 'react';
import {Button, Modal} from 'react-bootstrap';

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
  onClose
}) => {
  return (
    <Modal
      centered
      size="sm"
      show={show}
      onHide={() => onClose()}
      aria-modal="true"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{margin: 'auto'}}>
          Delete {deleteObject.deleteName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign: 'center'}}>
        <p>Confirm delete {deleteObject.deleteName}:</p>
        <h5>{deleteObject.deleteItem}</h5>
        <p>{deleteObject.deleteItemDescription}</p>
        <Button onClick={handleDelete} variant="danger">
          Confirm Delete
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationModal;
