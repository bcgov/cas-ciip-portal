import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import moment from 'moment-timezone';
import {Form, Button} from 'react-bootstrap';
import {ApplicationCommentsByForm_reviewComment} from 'ApplicationCommentsByForm_reviewComment.graphql';
import updateReviewCommentMutation from 'mutations/application/updateReviewCommentMutation';
import deleteReviewCommentMutation from 'mutations/application/deleteReviewCommentMutation';

/*
 * The ApplicationComments renders all the comments on the various sections of the application
 */

interface Props {
  reviewComment: ApplicationCommentsByForm_reviewComment;
  relay: RelayProp;
  review: boolean;
  version: any;
}

export const ApplicationCommentsByForm: React.FunctionComponent<Props> = props => {
  const {reviewComment, review, version} = props;

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
            .format('YYYY-MM-DDTHH:mm:ss')
        }
      },
      applicationId: reviewComment.applicationId,
      version: String(version)
    };

    const response = await deleteReviewCommentMutation(environment, variables);
    console.log(response);
  };

  return (
    <>
      <tr>
        <td>{reviewComment.description}</td>
        {review ? (
          <td style={{textAlign: 'center'}}>
            <Button onClick={deleteComment}>Delete</Button>
            <Form.Check
              checked={reviewComment.resolved}
              type="checkbox"
              onChange={resolveComment}
            />
          </td>
        ) : null}
      </tr>
      <tr>
        <small>
          {moment(reviewComment.createdAt).format('MMM Do YYYY, h:mm:ss a')}
        </small>
      </tr>
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
      applicationId
      applicationByApplicationId {
        id
      }
    }
  `
});
