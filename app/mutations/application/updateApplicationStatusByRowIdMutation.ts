import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateApplicationStatusByRowIdMutation as updateApplicationStatusByRowIdMutationType,
  updateApplicationStatusByRowIdMutationVariables
} from 'updateApplicationStatusByRowIdMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateApplicationStatusByRowIdMutation(
    $input: UpdateApplicationStatusByRowIdInput!
  ) {
    updateApplicationStatusByRowId(input: $input) {
      applicationStatus {
        applicationId
        applicationStatus
      }
      clientMutationId
    }
  }
`;

const updateApplicationStatusByRowIdMutation = async (
  environment: RelayModernEnvironment,
  variables: updateApplicationStatusByRowIdMutationVariables
) => {
  const updateApplicationStatusPayload = {
    updateApplicationStatus: {
      applicationStatus: {
        rowId: variables.input.rowId,
        ...variables.input.applicationStatusPatch
      }
    }
  };

  const m = new BaseMutation<updateApplicationStatusByRowIdMutationType>(
    'update-application-status-by-row-id-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    updateApplicationStatusPayload
  );
};

export default updateApplicationStatusByRowIdMutation;
