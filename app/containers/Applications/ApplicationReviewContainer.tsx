import React, {useState, SyntheticEvent} from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {
  ApplicationReviewContainer_formResultStatus,
  CiipFormResultStatus
} from 'ApplicationReviewContainer_formResultStatus.graphql';
import {ReviewCommentType} from 'ApplicationCommentsByForm_reviewComment.graphql';
import createReviewCommentMutation from 'mutations/application/createReviewCommentMutation';

interface Props {
  relay: RelayProp;
  formResultStatus: ApplicationReviewContainer_formResultStatus;
  formName: string;
  formResultId: string;
}

interface Target extends EventTarget {
  reviewComment: {
    value: string;
  };
  reviewStatus: {
    value: string;
  };
}

export const ApplicationReview: React.FunctionComponent<Props> = ({
  relay,
  formResultStatus,
  formName,
  formResultId
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reviewStatuses: Record<string, CiipFormResultStatus> = {
    approved: 'APPROVED',
    requestChanges: 'CHANGES_REQUESTED',
    inReview: 'IN_REVIEW',
    needsAttention: 'NEEDS_ATTENTION'
  };

  const addComment = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.persist();
    const comment = (e.target as Target).reviewComment.value;
    const commentType = (e.target as Target).reviewStatus.value;

    if (!comment) return null;
    const {environment} = relay;
    const variables = {
      input: {
        reviewComment: {
          applicationId: formResultStatus.applicationId,
          formId: formResultStatus.formId,
          description: comment,
          commentType: commentType as ReviewCommentType,
          resolved: false
        }
      }
    };
    console.log(variables);

    const response = await createReviewCommentMutation(
      environment,
      variables,
      formResultId
    );
    console.log(response);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        {formResultStatus.formResultStatus.replace('_', ' ')}
      </Button>
      <Modal
        size="lg"
        show={show}
        className="review-modal"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reviewing {formName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="review-box" onSubmit={addComment}>
            <Form.Group>
              <Form.Label>Internal Comment</Form.Label>
              <Form.Control name="reviewComment" as="textarea" rows="3" />
            </Form.Group>
            <Row className="review-status">
              <Col sm={12}>
                <div className="radio">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value={reviewStatuses.approved}
                  />
                  <div className="description">
                    <h6>Approve</h6>
                    <span>
                      Approve this section. Leaving a comment is optional
                    </span>
                  </div>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value="general comment"
                  />
                  <div className="description">
                    <h6>Comment</h6>
                    <span>Leave a comment for internal use</span>
                  </div>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value={reviewStatuses.requestChanges}
                  />
                  <div className="description">
                    <h6>Request Changes</h6>
                    <span>
                      Request changes from the applicant before this can be
                      approved
                    </span>
                  </div>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value={reviewStatuses.needsAttention}
                  />
                  <div className="description">
                    <h6>Flag</h6>
                    <span>Flag this section for further attention</span>
                  </div>
                </div>
              </Col>
            </Row>

            <br />
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx global>
        {`
          .review-status .radio {
            display: flex;
            margin-top: 20px;
          }
          .review-status input {
            margin-right: 10px;
          }
          .review-status .description h6 {
            margin-bottom: 0;
          }
          .review-status .description span {
            font-size: 14px;
            color: #666;
          }
        `}
      </style>
    </>
  );
};

export default createFragmentContainer(ApplicationReview, {
  formResultStatus: graphql`
    fragment ApplicationReviewContainer_formResultStatus on FormResultStatus {
      applicationId
      formId
      formResultStatus
    }
  `
});
