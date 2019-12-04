import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateApplicationMutationVariables,
  updateApplicationMutation as updateApplicationMutationType
} from 'updateApplicationMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateApplicationMutation($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      clientMutationId
      application {
        id
        certificationSignature
      }
    }
  }
`;

const updateApplicationMutation = async (
  environment: RelayModernEnvironment,
  variables: updateApplicationMutationVariables
) => {
  const optimisticResponse = {
    updateApplication: {
      application: {
        id: variables.input.id,
        certificationSignature:
          variables.input.applicationPatch.certificationSignature
      }
    }
  };
  const m = new BaseMutation<updateApplicationMutationType>(
    'update-application-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse
  );
};

export default updateApplicationMutation;
