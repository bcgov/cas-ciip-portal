import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createApplicationReviewMutation as createApplicationReviewMutationType,
  createApplicationReviewMutationVariables
} from 'createApplicationReviewMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createApplicationReviewMutation(
    $input: CreateApplicationReviewMutationChainInput!
  ) {
    createApplicationReviewMutationChain(input: $input) {
      applicationReview {
        ...ApplicationReviewContainer_applicationReview
        ...ApplicationCommentsByForm_applicationReview
        formResultByFormResultId {
          applicationReviewsByFormResultId {
            edges {
              node {
                id
              }
            }
          }
          applicationReview {
            id
          }
        }
      }
    }
  }
`;

const createApplicationReviewMutation = async (
  environment: RelayModernEnvironment,
  variables: createApplicationReviewMutationVariables
) => {
  const m = new BaseMutation<createApplicationReviewMutationType>(
    'create-application-review-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createApplicationReviewMutation;
