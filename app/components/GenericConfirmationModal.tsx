import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonVariant?: string;
  cancelButtonVariant?: string;
  size?: "sm" | "lg" | "xl";
}

export const GenericConfirmationModal: React.FunctionComponent<Props> = ({
  children,
  show,
  title,
  onConfirm,
  onCancel,
  confirmButtonVariant,
  confirmButtonText = "Confirm",
  cancelButtonVariant = "secondary",
  cancelButtonText = "Cancel",
  size,
}) => {
  return (
    <Modal
      onHide={onCancel}
      show={show}
      size={size}
      centered
      aria-labelledby="modal-title"
    >
      <Modal.Header>
        <h2 id="modal-title">{title}</h2>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button id="cancel" onClick={onCancel} variant={cancelButtonVariant}>
          {cancelButtonText}
        </Button>
        <Button id="confirm" onClick={onConfirm} variant={confirmButtonVariant}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
      <style jsx>{`
        h2 {
          margin-bottom: 0;
        }
      `}</style>
      <style jsx global>{`
        .modal-header {
          background: #036;
          color: #fff;
        }
      `}</style>
    </Modal>
  );
};

export default GenericConfirmationModal;
