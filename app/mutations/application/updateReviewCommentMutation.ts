import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateReviewCommentMutationVariables,
  updateReviewCommentMutation as updateReviewCommentMutationType
} from 'updateReviewCommentMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateReviewCommentMutation($input: UpdateReviewCommentInput!) {
    updateReviewComment(input: $input) {
      clientMutationId
      reviewComment {
        resolved
        ...ApplicationCommentsByForm_reviewComment
      }
    }
  }
`;

const updateReviewCommentMutation = async (
  environment: RelayModernEnvironment,
  variables: updateReviewCommentMutationVariables
) => {
  const optimisticResponse = {
    updateReviewComment: {
      reviewComment: {
        id: variables.input.id,
        ...variables.input.reviewCommentPatch
      }
    }
  };
  const m = new BaseMutation<updateReviewCommentMutationType>(
    'update-review-comment-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse
  );
};

export default updateReviewCommentMutation;
