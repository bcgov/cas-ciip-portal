import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateFormResultMutation($input: UpdateFormResultInput!) {
    updateFormResult(input: $input) {
      formResult {
        id
        formResult
      }
    }
  }
`;

const updateFormResultMutation = async (environment, variables) => {
  const m = new BaseMutation('update-form-result-mutation');
  return m.performMutation(environment, mutation, variables);
};

export default updateFormResultMutation;
