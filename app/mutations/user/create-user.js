import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        firstName
        lastName
        emailAddress
      }
    }
  }
`;

export default function createUser(
  environment,
  variables,
  onCompletedCallback,
  onErrorCallback
) {
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: async (response, errors) => {
      console.log(response);
      onCompletedCallback;
    },
    onError: err => {
      console.error(err);
      onErrorCallback;
    }
  });
}
