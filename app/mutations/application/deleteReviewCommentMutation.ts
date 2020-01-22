import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateReviewCommentMutationVariables,
  updateReviewCommentMutation as updateReviewCommentMutationType
} from 'updateReviewCommentMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';
import {
  SelectorStoreUpdater,
  RecordSourceProxy
} from 'relay-runtime/lib/store/RelayStoreTypes';
import {ConnectionHandler} from 'relay-runtime';

const mutation = graphql`
  mutation deleteReviewCommentMutation(
    $input: UpdateReviewCommentInput!
    $applicationId: ID!
    $version: String!
  ) {
    updateReviewComment(input: $input) {
      query {
        application(id: $applicationId) {
          ...ApplicationDetailsContainer_application
            @arguments(version: $version)
        }
      }
    }
  }
`;

const deleteReviewCommentMutation = async (
  environment: RelayModernEnvironment,
  variables: updateReviewCommentMutationVariables,
  formResultId: string
) => {
  let connectionKey = 'ApplicationCommentsContainer_internalGeneralComments';

  if (variables.input.reviewCommentPatch.commentType === 'REQUESTED_CHANGE')
    connectionKey = 'ApplicationCommentsContainer_requestedChangeComments';

  const updater: SelectorStoreUpdater<RecordSourceProxy> = store => {
    const formResultRoot = store.get(formResultId);
    const commentConnection = ConnectionHandler.getConnection(
      formResultRoot,
      connectionKey
    );
    ConnectionHandler.deleteNode(commentConnection, variables.input.id);
  };

  const m = new BaseMutation<updateReviewCommentMutationType>(
    'update-review-comment-mutation'
  );

  return m.performMutation(environment, mutation, variables, null, updater);
};

export default deleteReviewCommentMutation;
