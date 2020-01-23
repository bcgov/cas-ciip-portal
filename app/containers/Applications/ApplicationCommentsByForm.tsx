import React, {useState} from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import moment from 'moment-timezone';
import {Modal, Button} from 'react-bootstrap';
import {ApplicationCommentsByForm_reviewComment} from 'ApplicationCommentsByForm_reviewComment.graphql';
import updateReviewCommentMutation from 'mutations/application/updateReviewCommentMutation';
import deleteReviewCommentMutation from 'mutations/application/deleteReviewCommentMutation';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
/*
 * The ApplicationComments renders all the comments on the various sections of the application
 */

interface Props {
  reviewComment: ApplicationCommentsByForm_reviewComment;
  relay: RelayProp;
  review: boolean;
  version: number;
  formResultId: string;
}

export const ApplicationCommentsByForm: React.FunctionComponent<Props> = props => {
  const {reviewComment, review, version, formResultId} = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const resolveComment = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        id: reviewComment.id,
        reviewCommentPatch: {
          description: reviewComment.description,
          resolved: !reviewComment.resolved,
          createdAt: reviewComment.createdAt
        }
      }
    };

    const response = await updateReviewCommentMutation(environment, variables);
    console.log(response);
  };

  const deleteComment = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        id: reviewComment.id,
        reviewCommentPatch: {
          deletedAt: moment
            .tz('America/Vancouver')
            .format('YYYY-MM-DDTHH:mm:ss'),
          commentType: reviewComment.commentType
        }
      },
      applicationId: reviewComment.applicationByApplicationId.id,
      version: String(version)
    };

    const response = await deleteReviewCommentMutation(
      environment,
      variables,
      formResultId
    );
    console.log(response);
  };

  return (
    <>
      <tr>
        <td>
          <div className="description">{reviewComment.description}</div>
          <div>
            <small style={{color: '#777'}}>
              {reviewComment.ciipUserByCreatedBy.firstName}{' '}
              {reviewComment.ciipUserByCreatedBy.firstName} (
              {moment(reviewComment.createdAt).format('MMM Do YYYY, h:mm a')})
            </small>
          </div>
        </td>
        {review ? (
          <td style={{textAlign: 'right'}}>
            <Button
              size="sm"
              className="resolve-check"
              variant={
                reviewComment.resolved ? 'outline-secondary' : 'outline-primary'
              }
              onClick={resolveComment}
            >
              {reviewComment.resolved ? 'Unresolve' : 'Resolve'}
            </Button>
            <i
              className="delete-comment-icon"
              onClick={() => setModalVisible(true)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </i>
          </td>
        ) : null}
      </tr>
      <Modal
        centered
        show={isModalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this comment?</p>
        </Modal.Body>
        <Modal.Footer className="text-center">
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            No, keep it
          </Button>
          <Button variant="danger" onClick={deleteComment}>
            Yes, delete this comment
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>
        {`
          .delete-comment-icon {
            cursor: pointer;
            margin-left: 15px;
          }
        `}
      </style>
    </>
  );
};

export default createFragmentContainer(ApplicationCommentsByForm, {
  reviewComment: graphql`
    fragment ApplicationCommentsByForm_reviewComment on ReviewComment {
      id
      description
      createdAt
      resolved
      commentType
      applicationByApplicationId {
        id
      }
      ciipUserByCreatedBy {
        firstName
        lastName
      }
    }
  `
});
