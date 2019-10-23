import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation UserOrganisationMutation($input: CreateUserOrganisationInput!) {
    createUserOrganisation(input: $input) {
      userOrganisation {
        id
      }
    }
  }
`;
export const userOrganisationMutation = async (environment, variables) => {
  const m = new BaseMutation(
    environment,
    mutation,
    variables,
    'create-user-organisation-mutation'
  );
  return m.performMutation();
};
