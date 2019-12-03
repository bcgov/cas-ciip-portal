import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import moment from 'moment';

/*
 * The ApplicationComments renders all the comments on the various sections of the application
 */

interface Props {
  applicationReview;
  relay: RelayProp;
}

export const ApplicationCommentsByForm: React.FunctionComponent<Props> = props => {
  const {applicationReview} = props;
  const reviewComments =
    applicationReview.reviewCommentsByApplicationReviewId.edges;
  return (
    <>
      <div key={applicationReview.id} className="review-box">
        <div>
          Set to <strong>{applicationReview.reviewStatus}</strong>
          &nbsp;
          <small>
            {moment(applicationReview.createdAt).format(
              'MMM Do YYYY, h:mm:ss a'
            )}
          </small>
        </div>
        <ul className="comment-box">
          {reviewComments.map(({node}) => (
            <li key={node.id} className="comments">
              <div>{node.description}</div>
              <div>
                <small>
                  {moment(node.createdAt).format('MMM Do YYYY, h:mm:ss a')}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .form-result-box {
          padding: 25px;
          margin-bottom: 20px;
          border: 1px solid #ff713a;
          border-radius: 5px;
          background-color: #fff4dcab;
          font-size: 14px;
        }

        .form-result-box h5 {
          border-bottom: 1px solid #888;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .form-result-box .review-box {
          border-bottom: 1px solid #d2d2d2;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(ApplicationCommentsByForm, {
  applicationReview: graphql`
    fragment ApplicationCommentsByForm_applicationReview on ApplicationReview {
      id
      reviewStatus
      createdAt
      reviewCommentsByApplicationReviewId {
        edges {
          node {
            id
            description
            createdAt
          }
        }
      }
    }
  `
});
