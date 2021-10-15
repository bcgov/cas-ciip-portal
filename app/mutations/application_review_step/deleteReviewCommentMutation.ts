import { graphql } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import {
  updateReviewCommentMutationVariables,
  updateReviewCommentMutation as updateReviewCommentMutationType,
} from "updateReviewCommentMutation.graphql";
import BaseMutation from "mutations/BaseMutation";
import {
  SelectorStoreUpdater,
  RecordSourceProxy,
} from "relay-runtime/lib/store/RelayStoreTypes";
import { ConnectionHandler } from "relay-runtime";

const mutation = graphql`
  mutation deleteReviewCommentMutation($input: UpdateReviewCommentInput!) {
    updateReviewComment(input: $input) {
      reviewComment {
        id
      }
    }
  }
`;

const deleteReviewCommentMutation = async (
  environment: RelayModernEnvironment,
  variables: updateReviewCommentMutationVariables,
  applicationReviewStepId: string,
  connectionKey: string
) => {
  const updater: SelectorStoreUpdater<RecordSourceProxy> = (store) => {
    const applicationReviewStepRoot = store.get(applicationReviewStepId);
    const commentConnection = ConnectionHandler.getConnection(
      applicationReviewStepRoot,
      connectionKey
    );
    ConnectionHandler.deleteNode(commentConnection, variables.input.id);
  };

  const m = new BaseMutation<updateReviewCommentMutationType>(
    "delete-review-comment-mutation"
  );

  return m.performMutation(environment, mutation, variables, null, updater);
};

export default deleteReviewCommentMutation;
export { mutation };
