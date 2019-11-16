import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  UpdateUserOrganisationMutation as UpdateUserOrganisationMutationType,
  UpdateUserOrganisationMutationVariables
} from 'UpdateUserOrganisationMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation UpdateUserOrganisationMutation(
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
  variables: UpdateUserOrganisationMutationVariables
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

  const m = new BaseMutation<UpdateUserOrganisationMutationType>(
    'update-ciip-user-organisation-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    updateUserOrganisationPayload
  );
};
