import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateApplicationStatusMutation as updateApplicationStatusMutationType,
  updateApplicationStatusMutationVariables
} from 'updateApplicationStatusMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateApplicationStatusMutation(
    $input: UpdateApplicationStatusInput!
  ) {
    updateApplicationStatus(input: $input) {
      applicationStatus {
        id
        applicationStatus
      }
      clientMutationId
    }
  }
`;

const updateApplicationStatusMutation = async (
  environment: RelayModernEnvironment,
  variables: updateApplicationStatusMutationVariables
) => {
  // Optimistic response
  const updateApplicationStatusPayload = {
    updateApplicationStatus: {
      applicationStatus: {
        id: variables.input.id,
        ...variables.input.applicationStatusPatch
      }
    }
  };

  const m = new BaseMutation<updateApplicationStatusMutationType>(
    'update-application-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    updateApplicationStatusPayload
  );
};

export default updateApplicationStatusMutation;
