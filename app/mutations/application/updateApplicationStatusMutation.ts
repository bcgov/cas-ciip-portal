import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateApplicationStatusMutation(
    $input: UpdateApplicationStatusInput!
  ) {
    updateApplicationStatus(input: $input) {
      applicationStatus {
        id
      }
    }
  }
`;

const updateApplicationStatusMutation = async (environment, variables) => {
  const m = new BaseMutation('update-application-mutation');
  return m.performMutation(environment, mutation, variables);
};

export default updateApplicationStatusMutation;
