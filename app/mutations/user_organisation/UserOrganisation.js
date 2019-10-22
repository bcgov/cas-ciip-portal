import {graphql, commitMutation as commitMutationDefault} from 'react-relay';

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
  const commitMutation = async (environment, options) => {
    return new Promise((resolve, reject) => {
      commitMutationDefault(environment, {
        ...options,
        onError: error => {
          reject(error);
          console.log(error);
        },
        onCompleted: (response, errors) => {
          errors ? reject(errors) : resolve(response);
        }
      });
    });
  };

  // TODO: abstract onError into a base class
  return commitMutation(environment, {mutation, variables});
};
