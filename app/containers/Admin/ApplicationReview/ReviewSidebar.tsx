import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faLock} from '@fortawesome/free-solid-svg-icons';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ReviewSidebar_generalComments} from '__generated__/ReviewSidebar_generalComments.graphql';
import {ReviewSidebar_internalComments} from '__generated__/ReviewSidebar_internalComments.graphql';
import ReviewComment from 'components/Admin/ReviewComment';
import updateReviewCommentMutation from 'mutations/application/updateReviewCommentMutation';
import {nowMoment} from 'functions/formatDates';

interface Props {
  isCompleted: boolean;
  reviewStep: string;
  onClose: () => void;
  onCompletionToggle: (boolean) => void;
  generalComments: ReviewSidebar_generalComments;
  internalComments: ReviewSidebar_internalComments;
  relay: RelayProp;
}

const getCommentsToShow = (comments, showResolved) => {
  return comments.filter((c) => showResolved || !c.node.resolved);
};

export const ReviewSidebar: React.FunctionComponent<Props> = ({
  isCompleted,
  reviewStep,
  onClose,
  onCompletionToggle,
  generalComments,
  internalComments,
  relay
}) => {
  const [showingResolved, setShowingResolved] = useState(false);
  const toggleResolved = () => setShowingResolved((current) => !current);
  const generalCommentsToShow = getCommentsToShow(
    generalComments.edges,
    showingResolved
  );
  const internalCommentsToShow = getCommentsToShow(
    internalComments.edges,
    showingResolved
  );
  const markCompletedButton = (
    <Button
      variant="outline-primary"
      type="button"
      onClick={() => onCompletionToggle(true)}
      style={{
        padding: '0.75rem .9rem',
        display: 'block',
        margin: 'auto'
      }}
    >
      <FontAwesomeIcon icon={faCheck} style={{marginRight: '0.5rem'}} />
      Mark this review step completed
    </Button>
  );
  const resolveComment = async (id, resolve) => {
    const {environment} = relay;
    const variables = {
      input: {
        id,
        reviewCommentPatch: {
          resolved: resolve
        }
      }
    };
    await updateReviewCommentMutation(environment, variables);
  };
  const deleteComment = async (id) => {
    const {environment} = relay;
    const variables = {
      input: {
        id,
        reviewCommentPatch: {
          deletedAt: nowMoment().format('YYYY-MM-DDTHH:mm:ss')
        }
      }
    };
    await updateReviewCommentMutation(environment, variables);
  };
  return (
    <div id="sidebar" className="col-md-5 col-lg-4 col-xxl-3">
      <button
        type="button"
        id="close"
        aria-label={`Close ${reviewStep} Review`}
        onClick={onClose}
      >
        ×
      </button>
      <h2>{reviewStep} Review</h2>
      {isCompleted ? (
        <p className="mark-incomplete">
          <FontAwesomeIcon icon={faCheck} style={{marginRight: 2}} />
          <span> This review step has been completed. </span>
          <Button
            variant="link"
            style={{
              padding: '0 0 2px 0',
              fontSize: '0.9rem',
              lineHeight: 1,
              display: 'inline'
            }}
            onClick={() => onCompletionToggle(false)}
          >
            Mark incomplete
          </Button>
        </p>
      ) : (
        markCompletedButton
      )}
      <div id="scrollable-comments" tabIndex={0}>
        <h3 id="general-comments-label">
          General Comments{' '}
          <small>
            <em>(Visible to applicant)</em>
          </small>
        </h3>
        {generalCommentsToShow.length === 0 ? (
          <p className="empty-comments">No general comments to show.</p>
        ) : (
          <ul aria-labelledby="general-comments-label">
            {generalCommentsToShow.map(
              ({
                node: {
                  id,
                  description,
                  createdAt,
                  ciipUserByCreatedBy,
                  resolved
                }
              }) => (
                <ReviewComment
                  key={id}
                  id={id}
                  description={description}
                  createdAt={createdAt}
                  createdBy={`${ciipUserByCreatedBy.firstName} ${ciipUserByCreatedBy.lastName}`}
                  viewOnly={isCompleted}
                  isResolved={resolved}
                  onResolveToggle={resolveComment}
                  onDelete={deleteComment}
                />
              )
            )}
          </ul>
        )}
        <h3 id="internal-comments-label">
          Internal Comments <FontAwesomeIcon icon={faLock} />{' '}
          <small>
            <em>(Not visible to applicant)</em>
          </small>
        </h3>
        {internalCommentsToShow.length === 0 ? (
          <p className="empty-comments">No internal comments to show.</p>
        ) : (
          <ul aria-labelledby="internal-comments-label">
            {internalCommentsToShow.map(
              ({
                node: {
                  id,
                  description,
                  createdAt,
                  ciipUserByCreatedBy,
                  resolved
                }
              }) => (
                <ReviewComment
                  key={id}
                  id={id}
                  description={description}
                  createdAt={createdAt}
                  createdBy={`${ciipUserByCreatedBy.firstName} ${ciipUserByCreatedBy.lastName}`}
                  viewOnly={isCompleted}
                  isResolved={resolved}
                  onResolveToggle={resolveComment}
                  onDelete={deleteComment}
                />
              )
            )}
          </ul>
        )}
      </div>
      <div id="button-footer">
        <Button variant="link" style={{padding: 0}} onClick={toggleResolved}>
          {`${showingResolved ? 'Hide' : 'Show'} resolved comments`}
        </Button>
        {!isCompleted && <Button variant="primary">+ New Comment</Button>}
      </div>
      <style jsx>{`
        #sidebar {
          position: fixed;
          top: 68px;
          right: 0;
          height: calc(100% - 68px);
          background: #f7f7f7;
          border: 1px solid transparent;
          border-left-color: #dfdfdf;
          padding: 0 1.5em;
        }
        #close {
          font-size: 2.2rem;
          position: absolute;
          top: 0;
          left: 1rem;
          cursor: pointer;
          border: none;
          background: none;
        }
        h2 {
          margin: 15px 0;
          text-align: center;
        }
        h3 {
          font-size: 1em;
          font-weight: bold;
          margin: 5px 0 15px 0;
        }
        h3:not(:first-of-type) {
          margin-top: 2em;
        }
        #scrollable-comments {
          overflow-y: scroll;
          height: calc(100% - 108px - 2.4rem - 53px);
          margin: 1.2rem 0;
          padding: 0.7rem;
          border-radius: 4px;
        }
        #scrollable-comments:hover {
          box-shadow: inset 0 0px 7px -1px #999;
        }
        #scrollable-comments::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 8px;
        }
        #scrollable-comments::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }
        #button-footer {
          position: absolute;
          bottom: 0;
          margin-bottom: 15px;
          width: calc(100% - 3em);
          display: flex;
          justify-content: space-between;
        }
        .mark-incomplete {
          line-height: 1;
          font-size: 0.9em;
          text-align: center;
          margin: 35px 0;
        }
        h3 ~ ul,
        h3 ~ p {
          padding-left: 0.3em;
        }
        ul:last-of-type {
          margin: 0;
        }
        .empty-comments {
          font-style: italic;
          font-size: 0.9em;
          margin-bottom: 0;
          line-height: 1.5;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default createFragmentContainer(ReviewSidebar, {
  generalComments: graphql`
    fragment ReviewSidebar_generalComments on ReviewCommentsConnection {
      edges {
        node {
          id
          description
          createdAt
          resolved
          ciipUserByCreatedBy {
            firstName
            lastName
          }
        }
      }
    }
  `,
  internalComments: graphql`
    fragment ReviewSidebar_internalComments on ReviewCommentsConnection {
      edges {
        node {
          id
          description
          createdAt
          resolved
          ciipUserByCreatedBy {
            firstName
            lastName
          }
        }
      }
    }
  `
});
