import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import moment from 'moment-timezone';
import {Button} from 'react-bootstrap';
import {ApplicationCommentsByForm_reviewComment} from 'ApplicationCommentsByForm_reviewComment.graphql';

/*
 * The ApplicationComments renders all the comments on the various sections of the application
 */

interface Props {
  reviewComment: ApplicationCommentsByForm_reviewComment;
  relay: RelayProp;
}

export const ApplicationCommentsByForm: React.FunctionComponent<Props> = props => {
  const {reviewComment} = props;

  return (
    <>
      <tr>
        <td>{reviewComment.description}</td>
        <td style={{textAlign: 'center'}}>
          <Button variant="success">&#10003;</Button>
        </td>
      </tr>
      <tr>
        <small>
          {moment
            .tz(reviewComment.createdAt)
            .format('MMM Do YYYY, h:mm:ss a z', 'America/Vancouver')}
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
    }
  `
});
