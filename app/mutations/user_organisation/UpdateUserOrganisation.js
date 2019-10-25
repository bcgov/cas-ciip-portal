import {graphql} from 'react-relay';
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
    }
  }
`;

export const updateUserOrganisationMutation = async (
  environment,
  variables
) => {
  const m = new BaseMutation('update-user-organisation-mutation');
  return m.performMutation(environment, mutation, variables);
};
