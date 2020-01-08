import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateUserOrganisationMutation as updateUserOrganisationMutationType,
  updateUserOrganisationMutationVariables
} from 'updateUserOrganisationMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateUserOrganisationMutation(
    $input: UpdateCiipUserOrganisationInput!
  ) {
    updateCiipUserOrganisation(input: $input) {
      ciipUserOrganisation {
        id
        status
      }
      clientMutationId
    }
  }
`;

export const updateUserOrganisationMutation = async (
  environment: RelayModernEnvironment,
  variables: updateUserOrganisationMutationVariables
) => {
  // Optimistic response
  const updateUserOrganisationPayload = {
    updateCiipUserOrganisation: {
      ciipUserOrganisation: {
        id: variables.input.id,
        status: variables.input.ciipUserOrganisationPatch.status
      }
    }
  };

  const m = new BaseMutation<updateUserOrganisationMutationType>(
    'update-ciip-user-organisation-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    updateUserOrganisationPayload
  );
};
