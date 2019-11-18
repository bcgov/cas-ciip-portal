import {graphql, DeclarativeMutationConfig} from 'react-relay';
import {
  createUserOrganisationMutation as createUserOrganisationMutationType,
  createUserOrganisationMutationVariables
} from 'createUserOrganisationMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createUserOrganisationMutation(
    $input: CreateCiipUserOrganisationInput!
  ) {
    createCiipUserOrganisation(input: $input) {
      ciipUserOrganisationEdge {
        node {
          ...UserOrganisation_userOrganisation
        }
      }
    }
  }
`;

export const createUserOrganisationMutation = async (
  environment: RelayModernEnvironment,
  variables: createUserOrganisationMutationVariables,
  userId: string
) => {
  const configs: DeclarativeMutationConfig[] = [
    {
      type: 'RANGE_ADD',
      parentID: userId,
      connectionInfo: [
        {
          key: 'Organisations_ciipUserOrganisationsByCiipUserId',
          rangeBehavior: 'append'
        }
      ],
      edgeName: 'ciipUserOrganisationEdge'
    }
  ];

  const m = new BaseMutation<createUserOrganisationMutationType>(
    'create-ciip-user-organisation-mutation',
    configs
  );
  return m.performMutation(environment, mutation, variables);
};
