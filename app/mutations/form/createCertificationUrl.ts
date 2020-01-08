import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createCertificationUrlMutation as createCertificationUrlMutationType,
  createCertificationUrlMutationVariables
} from 'createCertificationUrlMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createCertificationUrlMutation(
    $input: CreateCertificationUrlInput!
  ) {
    createCertificationUrl(input: $input) {
      certificationUrl {
        rowId
      }
    }
  }
`;

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const createCertificationUrlMutation = async (
  environment: RelayModernEnvironment,
  variables: createCertificationUrlMutationVariables
) => {
  const m = new BaseMutation<createCertificationUrlMutationType>(
    'create-certification-url-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createCertificationUrlMutation;
