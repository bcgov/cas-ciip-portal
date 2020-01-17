import React, {useState, SyntheticEvent} from 'react';
import {Button, Modal, Dropdown, Form, Row, Col} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {
  ApplicationReviewContainer_formResultStatus,
  CiipFormResultStatus
} from 'ApplicationReviewContainer_formResultStatus.graphql';
import DropdownMenuItemComponent from 'components/DropdownMenuItemComponent';
import {ReviewCommentType} from 'ApplicationCommentsByForm_reviewComment.graphql';
import createReviewCommentMutation from 'mutations/application/createReviewCommentMutation';
import createFormResultStatusMutation from '../../mutations/application/createFormResultStatusMutation';

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

  const statusBadgeColor: Record<
    CiipFormResultStatus,
    'info' | 'danger' | 'success' | 'warning' | 'primary' | 'secondary'
  > = {
    IN_REVIEW: 'info',
    NEEDS_ATTENTION: 'warning',
    APPROVED: 'success',
    CHANGES_REQUESTED: 'secondary'
  };

  const reviewStatuses: Record<string, CiipFormResultStatus> = {
    approved: 'APPROVED',
    requestChanges: 'CHANGES_REQUESTED',
    inReview: 'IN_REVIEW',
    needsAttention: 'NEEDS_ATTENTION'
  };

  const commentType: Record<string, ReviewCommentType> = {
    APPROVED: 'APPROVAL',
    IN_REVIEW: 'GENERAL',
    CHANGES_REQUESTED: 'REQUESTED_CHANGE',
    NEEDS_ATTENTION: 'INTERNAL'
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.persist();
    const comment = (e.target as Target).reviewComment.value;
    const status = (e.target as Target).reviewStatus.value;

    if (!comment) return null;
    const {environment} = relay;
    const variables = {
      input: {
        applicationIdInput: formResultStatus.applicationId,
        formIdInput: formResultStatus.formId,
        descriptionInput: comment,
        commentTypeInput: commentType[status],
        versionNumberInput: formResultStatus.versionNumber
      },
      applicationId: formResultStatus.applicationByApplicationId.id,
      version: formResultStatus.versionNumber.toString()
    };

    const response = await createReviewCommentMutation(
      environment,
      variables,
      formResultId
    );
    console.log(response);
  };

  const setFormResultStatus = async (e: any) => {
    const {environment} = relay;
    const variables = {
      input: {
        formResultStatus: {
          applicationId: formResultStatus.applicationId,
          formId: formResultStatus.formId,
          versionNumber: formResultStatus.versionNumber,
          formResultStatus: e as CiipFormResultStatus
        }
      },
      applicationId: formResultStatus.applicationByApplicationId.id,
      version: formResultStatus.versionNumber.toString()
    };

    const response = await createFormResultStatusMutation(
      environment,
      variables
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
          <Form className="review-box" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
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
                    <span>Approve this section</span>
                  </div>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value={reviewStatuses.inReview}
                  />
                  <div className="description">
                    <h6>General Comment</h6>
                    <span>Leave a general comment</span>
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
                    <span>
                      Internal Comment (Flag this section for further attention)
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <br />
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          <Row style={{marginTop: '20px'}}>
            <Col md={4}>
              <h5>Form Status: </h5>
            </Col>
            <Col md={4}>
              <Dropdown style={{width: '100%'}}>
                <Dropdown.Toggle
                  style={{width: '100%', textTransform: 'capitalize'}}
                  variant={statusBadgeColor[formResultStatus.formResultStatus]}
                  id="dropdown"
                >
                  {formResultStatus.formResultStatus}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width: '100%'}}>
                  {Object.keys(statusBadgeColor).map(status => (
                    <DropdownMenuItemComponent
                      key={status}
                      itemEventKey={status}
                      itemFunc={setFormResultStatus}
                      itemTitle={status}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
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
      id
      applicationId
      formId
      formResultStatus
      versionNumber
      applicationByApplicationId {
        id
      }
    }
  `
});
