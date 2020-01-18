import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateReviewCommentMutationVariables,
  updateReviewCommentMutation as updateReviewCommentMutationType
} from 'updateReviewCommentMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation deleteReviewCommentMutation(
    $input: UpdateReviewCommentInput!
    $applicationId: ID!
    $version: String!
  ) {
    updateReviewComment(input: $input) {
      clientMutationId
      reviewComment {
        resolved
        ...ApplicationCommentsByForm_reviewComment
      }
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

export default deleteReviewCommentMutation;
