import React, {useState} from 'react';
import {Modal, Button, Form, FormCheck} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faEye} from '@fortawesome/free-solid-svg-icons';

interface Props {
  show: boolean;
  title: string;
  onSubmit: ({commentText: string, isInternalComment: boolean}) => void;
  onHide: () => void;
}

export const AddReviewCommentModal: React.FunctionComponent<Props> = ({
  show,
  title,
  onSubmit,
  onHide
}) => {
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [commentText, setCommentText] = useState('');

  const clearForm = () => {
    setIsInternalComment(false);
    setCommentText('');
  };
  const handleHide = () => {
    onHide();
    clearForm();
  };

  return (
    <Modal
      id="add-comment-modal"
      size="lg"
      show={show}
      onHide={handleHide}
      aria-labelledby="add-comment-title"
    >
      <Modal.Header closeButton>
        <h2 id="add-comment-title">{title}</h2>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="comment">
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <FormCheck>
          <FormCheck.Label>
            <FormCheck.Input
              checked={isInternalComment}
              onChange={(e) => setIsInternalComment(e.target.checked)}
            />
            Visible for <strong>internal</strong> use only
          </FormCheck.Label>
        </FormCheck>
      </Modal.Body>
      <Modal.Footer>
        <span>
          This comment will {isInternalComment && <strong>not</strong>} be
          visible to the applicant.
          <FontAwesomeIcon
            id="visibility-icon"
            icon={isInternalComment ? faLock : faEye}
          />
        </span>
        <Button
          id="submit"
          onClick={() => {
            if (commentText.trim().length > 0) {
              onSubmit({commentText, isInternalComment});
              clearForm();
            }
          }}
        >
          Add Comment
        </Button>
      </Modal.Footer>
      <style jsx>{`
        :global(.modal-header) {
          background: #036;
          color: #fff;
        }
        :global(button.close) {
          color: #fff;
        }
        :global(#add-comment-modal .modal-body) {
          padding: 1rem 2rem;
        }
        :global(#add-comment-modal .form-check) {
          margin: 1rem 0 0 0;
        }
        :global(.form-check-label, .form-check-input) {
          cursor: pointer;
        }
        :global(#visibility-icon) {
          margin: 0 1em 0 0.5em;
        }
        h2 {
          margin: 0;
        }
      `}</style>
    </Modal>
  );
};

export default AddReviewCommentModal;
