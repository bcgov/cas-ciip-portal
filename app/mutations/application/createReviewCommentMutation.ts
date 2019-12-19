import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createReviewCommentMutationVariables,
  createReviewCommentMutation as createReviewCommentMutationType
} from 'createReviewCommentMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createReviewCommentMutation($input: CreateReviewCommentInput!) {
    createReviewComment(input: $input) {
      clientMutationId
      reviewComment {
        id
        description
        createdAt
      }
    }
  }
`;

const createReviewCommentMutation = async (
  environment: RelayModernEnvironment,
  variables: createReviewCommentMutationVariables
) => {
  const m = new BaseMutation<createReviewCommentMutationType>(
    'create-review-comment-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createReviewCommentMutation;
