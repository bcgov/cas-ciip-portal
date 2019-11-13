import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  UpdateUserOrganisationMutation as updateUserOrganisationMutationType,
  UpdateUserOrganisationMutationVariables
} from 'UpdateUserOrganisationMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation UpdateUserOrganisationMutation(
    $input: UpdateUserOrganisationInput!
  ) {
    updateUserOrganisation(input: $input) {
      userOrganisation {
        id
        status
      }
      clientMutationId
    }
  }
`;

export const updateUserOrganisationMutation = async (
  environment: RelayModernEnvironment,
  variables: UpdateUserOrganisationMutationVariables
) => {
  // Optimistic response
  const updateUserOrganisationPayload = {
    updateUserOrganisation: {
      userOrganisation: {
        id: variables.input.id,
        status: variables.input.userOrganisationPatch.status
      }
    }
  };

  const m = new BaseMutation<updateUserOrganisationMutationType>(
    'update-user-organisation-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    updateUserOrganisationPayload
  );
};
