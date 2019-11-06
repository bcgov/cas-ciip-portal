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
    }
  }
`;

const updateApplicationStatusByRowIdMutation = async (
  environment: RelayModernEnvironment,
  variables: updateApplicationStatusByRowIdMutationVariables
) => {
  const m = new BaseMutation<updateApplicationStatusByRowIdMutationType>(
    'update-application-status-by-row-id-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default updateApplicationStatusByRowIdMutation;
