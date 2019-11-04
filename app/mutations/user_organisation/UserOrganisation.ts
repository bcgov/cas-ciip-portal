import {graphql, DeclarativeMutationConfig} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation UserOrganisationMutation($input: CreateUserOrganisationInput!) {
    createUserOrganisation(input: $input) {
      userOrganisationEdge {
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
          key: 'Organisations_userOrganisationsByUserId',
          rangeBehavior: 'append'
        }
      ],
      edgeName: 'userOrganisationEdge'
    }
  ];

  const m = new BaseMutation('create-user-organisation-mutation', configs);
  return m.performMutation(environment, mutation, variables);
};
