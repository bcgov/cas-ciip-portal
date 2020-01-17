import {graphql, DeclarativeMutationConfig} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createReviewCommentMutationVariables,
  createReviewCommentMutation as createReviewCommentMutationType
} from 'createReviewCommentMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createReviewCommentMutation(
    $input: CreateReviewCommentMutationChainInput!
    $applicationId: ID!
    $version: String!
  ) {
    createReviewCommentMutationChain(input: $input) {
      clientMutationId
      reviewCommentEdge {
        node {
          id
          description
          createdAt
          resolved
          commentType
        }
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

const createReviewCommentMutation = async (
  environment: RelayModernEnvironment,
  variables: createReviewCommentMutationVariables,
  formResultId: string
) => {
  let connectionKey = 'ApplicationCommentsContainer_internalGeneralComments';
  if (variables.input.commentTypeInput === 'REQUESTED_CHANGE')
    connectionKey = 'ApplicationCommentsContainer_requestedChangeComments';
  const configs: DeclarativeMutationConfig[] = [
    {
      type: 'RANGE_ADD',
      parentID: formResultId,
      connectionInfo: [
        {
          key: connectionKey,
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
  return m.performMutation(environment, mutation, variables);
};

export default createReviewCommentMutation;
