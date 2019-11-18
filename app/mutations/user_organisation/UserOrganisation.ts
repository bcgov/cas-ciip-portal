import {graphql, DeclarativeMutationConfig} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation UserOrganisationMutation($input: CreateCiipUserOrganisationInput!) {
    createCiipUserOrganisation(input: $input) {
      ciipUserOrganisationEdge {
        node {
          ...UserOrganisation_userOrganisation
        }
      }
    }
  }
`;

export const userOrganisationMutation = async (
  environment,
  variables,
  user
) => {
  const configs: DeclarativeMutationConfig[] = [
    {
      type: 'RANGE_ADD',
      parentID: user,
      connectionInfo: [
        {
          key: 'Organisations_ciipUserOrganisationsByCiipUserId',
          rangeBehavior: 'append'
        }
      ],
      edgeName: 'ciipUserOrganisationEdge'
    }
  ];

  const m = new BaseMutation('create-ciip-user-organisation-mutation', configs);
  return m.performMutation(environment, mutation, variables);
};
