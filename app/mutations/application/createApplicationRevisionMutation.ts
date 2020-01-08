import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createApplicationRevisionMutation as createApplicationRevisionMutationType,
  createApplicationRevisionMutationVariables
} from 'createApplicationRevisionMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createApplicationRevisionMutation(
    $input: CreateApplicationRevisionMutationChainInput!
  ) {
    createApplicationRevisionMutationChain(input: $input) {
      applicationRevision {
        id
        versionNumber
        applicationByApplicationId {
          id
          latestDraftRevision {
            id
            versionNumber
          }
          latestSubmittedRevision {
            id
            versionNumber
          }
        }
      }
    }
  }
`;

const createApplicationRevisionMutation = async (
  environment: RelayModernEnvironment,
  variables: createApplicationRevisionMutationVariables
) => {
  const m = new BaseMutation<createApplicationRevisionMutationType>(
    'create-application-revision-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createApplicationRevisionMutation;
