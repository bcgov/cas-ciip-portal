import {graphql, DeclarativeMutationConfig} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {ConnectionHandler} from 'relay-runtime';
import {
  createReviewCommentMutationVariables,
  createReviewCommentMutation as createReviewCommentMutationType
} from 'createReviewCommentMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createReviewCommentMutation(
    $input: CreateReviewCommentInput!
    $connections: [ID!]!
  ) {
    createReviewComment(input: $input) {
      reviewCommentEdge @appendEdge(connections: $connections) {
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
`;

const createReviewCommentMutation = async (
  environment: RelayModernEnvironment,
  variables: createReviewCommentMutationVariables,
  applicationReviewStepId: string,
  connectionKey
) => {
  const configs: DeclarativeMutationConfig[] = [
    {
      type: 'RANGE_ADD',
      parentID: applicationReviewStepId,
      connectionInfo: [
        {
          key: 'create-review-comment-mutation',
          rangeBehavior: 'append'
        }
      ],
      edgeName: 'reviewCommentEdge'
    }
  ];
  const m = new BaseMutation<createReviewCommentMutationType>(
    'create-review-comment-mutation',
    configs
  );
  return m.performMutation(environment, mutation, {
    input: {...variables.input},
    connections: [
      ConnectionHandler.getConnectionID(applicationReviewStepId, connectionKey)
    ]
  });
};

export default createReviewCommentMutation;
export {mutation};
