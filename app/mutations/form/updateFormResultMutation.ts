import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateFormResultMutation($input: UpdateFormResultInput!) {
    updateFormResult(input: $input) {
      clientMutationId
      formResult {
        id
        formResult
      }
    }
  }
`;

const updateFormResultMutation = async (environment, variables) => {
  const optimisticResponse = {
    updateFormResult: {
      formResult: {
        id: variables.input.id,
        formResult: variables.input.formResultPatch.formResult
      }
    }
  };

  const m = new BaseMutation('update-form-result-mutation');
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse
  );
};

export default updateFormResultMutation;
