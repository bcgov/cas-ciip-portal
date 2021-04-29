import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faLock} from '@fortawesome/free-solid-svg-icons';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ReviewSidebar_applicationReviewStep} from '__generated__/ReviewSidebar_applicationReviewStep.graphql';
import {createReviewCommentMutationVariables} from '__generated__/createReviewCommentMutation.graphql';
import ReviewComment from 'components/Admin/ApplicationReview/ReviewComment';
import createReviewCommentMutation from 'mutations/application_review_step/createReviewCommentMutation';
import updateReviewCommentMutation from 'mutations/application_review_step/updateReviewCommentMutation';
import deleteReviewCommentMutation from 'mutations/application_review_step/deleteReviewCommentMutation';
import updateApplicationReviewStepMutation from 'mutations/application_review_step/updateApplicationReviewStepMutation';
import {nowMoment} from 'functions/formatDates';
import {capitalize} from 'lib/text-transforms';
import GenericConfirmationModal from 'components/GenericConfirmationModal';
import AddReviewCommentModal from 'components/Admin/ApplicationReview/AddReviewCommentModal';

interface Props {
  onClose: () => void;
  applicationReviewStep: ReviewSidebar_applicationReviewStep;
  isFinalized: boolean;
  relay: RelayProp;
  headerOffset?: number;
}

export const ReviewSidebar: React.FunctionComponent<Props> = ({
  onClose,
  applicationReviewStep,
  isFinalized,
  relay,
  headerOffset = 68
}) => {
  const [showingResolved, setShowingResolved] = useState(false);
  const [
    showUnresolvedCommentsModal,
    setShowUnresolvedCommentsModal
  ] = useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const toggleResolved = () => setShowingResolved((current) => !current);
  const reviewStepName = capitalize(
    applicationReviewStep?.reviewStepByReviewStepId?.stepName
  );

  const generalComments = applicationReviewStep?.generalComments?.edges;
  const internalComments = applicationReviewStep?.internalComments?.edges;
  const allGeneralCommentsAreResolved = generalComments?.every(
    (c) => c.node.resolved
  );
  const allInternalCommentsAreResolved = internalComments?.every(
    (c) => c.node.resolved
  );
  const noGeneralCommentsToShow =
    generalComments?.length === 0 ||
    (!showingResolved && allGeneralCommentsAreResolved);
  const noInternalCommentsToShow =
    internalComments?.length === 0 ||
    (!showingResolved && allInternalCommentsAreResolved);

  const markReviewStepComplete = async (isComplete) => {
    const {environment} = relay;
    const variables = {
      input: {
        id: applicationReviewStep?.id,
        applicationReviewStepPatch: {
          isComplete
        }
      }
    };
    await updateApplicationReviewStepMutation(environment, variables);
  };

  const confirmCommentsResolvedBeforeMarkCompleted = () => {
    const allCommentsAreResolved =
      allGeneralCommentsAreResolved && allInternalCommentsAreResolved;
    if (allCommentsAreResolved) markReviewStepComplete(true);
    else {
      setShowUnresolvedCommentsModal(true);
    }
  };
  const markCompletedButton = (
    <Button
      id="markCompleted"
      variant="outline-primary"
      type="button"
      onClick={confirmCommentsResolvedBeforeMarkCompleted}
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
  const markIncompleteButton = (
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
        onClick={() => markReviewStepComplete(false)}
      >
        Mark incomplete
      </Button>
    </p>
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
  const deleteComment = async (id, commentType) => {
    const {environment} = relay;
    const variables = {
      input: {
        id,
        reviewCommentPatch: {
          deletedAt: nowMoment().format('YYYY-MM-DDTHH:mm:ss')
        }
      }
    };

    await deleteReviewCommentMutation(
      environment,
      variables,
      applicationReviewStep?.id,
      `ReviewSidebar_${commentType}Comments`
    );
  };

  const renderComment = (
    commentType,
    {id, description, createdAt, ciipUserByCreatedBy, resolved}
  ) => {
    return (
      <ReviewComment
        key={id}
        id={id}
        description={description}
        createdAt={createdAt}
        createdBy={`${ciipUserByCreatedBy.firstName} ${ciipUserByCreatedBy.lastName}`}
        viewOnly={isFinalized || applicationReviewStep?.isComplete}
        isResolved={resolved}
        onResolveToggle={resolveComment}
        onDelete={(id) => deleteComment(id, commentType)}
      />
    );
  };

  const confirmCommentsResolvedModal = (
    <GenericConfirmationModal
      show={showUnresolvedCommentsModal}
      title={`Confirm ${applicationReviewStep?.reviewStepByReviewStepId?.stepName} review is completed`}
      onConfirm={() => {
        markReviewStepComplete(true);
        setShowUnresolvedCommentsModal(false);
      }}
      size="lg"
      onCancel={() => setShowUnresolvedCommentsModal(false)}
      confirmButtonVariant="outline-primary"
      cancelButtonVariant="primary"
      cancelButtonText="Cancel"
      confirmButtonText="Mark this review step completed"
    >
      <div style={{padding: '1em 1em 0 1em'}}>
        <p>
          There are <strong>unresolved comments</strong> in this review step.
          Are you sure you want to mark it completed?
        </p>
        <p>
          Don&apos;t worry - marking a step completed isn&apos;t final. You can
          still mark it incomplete to add more comments before making an
          application decision.
        </p>
        <p>
          If you continue,{' '}
          <strong>unresolved comments will be seen by the applicant</strong>{' '}
          when you make an application decision or request changes.
        </p>
      </div>
    </GenericConfirmationModal>
  );

  const handleAddReviewComment = async ({commentText, isInternalComment}) => {
    const commentType = isInternalComment ? 'internal' : 'general';
    const {environment} = relay;
    const variables = {
      input: {
        reviewComment: {
          applicationReviewStepId: applicationReviewStep.rowId,
          commentType: commentType.toUpperCase(),
          description: commentText
        }
      }
    };
    await createReviewCommentMutation(
      environment,
      variables as createReviewCommentMutationVariables,
      applicationReviewStep.id,
      `ReviewSidebar_${commentType}Comments`
    );
    setShowAddCommentModal(false);
  };

  return (
    <div id="sidebar" className="col-md-5 col-lg-4 col-xxl-3">
      <button
        type="button"
        id="close"
        aria-label={`Close ${reviewStepName} Review`}
        onClick={onClose}
      >
        ×
      </button>
      <h2>{reviewStepName} Review</h2>
      {!isFinalized &&
        (applicationReviewStep?.isComplete
          ? markIncompleteButton
          : markCompletedButton)}
      <div id="scrollable-comments" tabIndex={0}>
        <h3 id="general-comments-label">
          General Comments{' '}
          <small>
            <em>(Visible to applicant)</em>
          </small>
        </h3>
        {noGeneralCommentsToShow ? (
          <p className="empty-comments">No general comments to show.</p>
        ) : (
          <ul aria-labelledby="general-comments-label">
            {generalComments?.map((comment) => {
              const showComment = showingResolved || !comment.node.resolved;
              return showComment
                ? renderComment('general', comment.node)
                : null;
            })}
          </ul>
        )}
        <h3 id="internal-comments-label">
          Internal Comments <FontAwesomeIcon icon={faLock} />{' '}
          <small>
            <em>(Not visible to applicant)</em>
          </small>
        </h3>
        {noInternalCommentsToShow ? (
          <p className="empty-comments">No internal comments to show.</p>
        ) : (
          <ul aria-labelledby="internal-comments-label">
            {internalComments?.map((comment) => {
              const showComment = showingResolved || !comment.node.resolved;
              return showComment
                ? renderComment('internal', comment.node)
                : null;
            })}
          </ul>
        )}
      </div>
      <div id="button-footer">
        <Button variant="link" style={{padding: 0}} onClick={toggleResolved}>
          {`${showingResolved ? 'Hide' : 'Show'} resolved comments`}
        </Button>
        {!isFinalized && !applicationReviewStep?.isComplete && (
          <Button
            id="new-comment"
            variant="primary"
            onClick={() => setShowAddCommentModal(true)}
          >
            + New Comment
          </Button>
        )}
      </div>
      {showUnresolvedCommentsModal && confirmCommentsResolvedModal}
      <AddReviewCommentModal
        title={`Add comment to ${reviewStepName} Review`}
        show={showAddCommentModal}
        onSubmit={handleAddReviewComment}
        onHide={() => setShowAddCommentModal(false)}
      />
      <style jsx>{`
        #sidebar {
          position: fixed;
          top: ${headerOffset}px;
          right: 0;
          height: calc(100% - ${headerOffset}px);
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
          margin: 0;
        }
        #sidebar h2:first-of-type {
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
  applicationReviewStep: graphql`
    fragment ReviewSidebar_applicationReviewStep on ApplicationReviewStep {
      id
      rowId
      isComplete
      reviewStepByReviewStepId {
        stepName
      }
      internalComments: reviewCommentsByApplicationReviewStepId(
        first: 2147483647
        filter: {commentType: {equalTo: INTERNAL}, deletedAt: {isNull: true}}
      ) @connection(key: "ReviewSidebar_internalComments", filters: []) {
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
      generalComments: reviewCommentsByApplicationReviewStepId(
        first: 2147483647
        filter: {commentType: {equalTo: GENERAL}, deletedAt: {isNull: true}}
      ) @connection(key: "ReviewSidebar_generalComments", filters: []) {
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
    }
  `
});
