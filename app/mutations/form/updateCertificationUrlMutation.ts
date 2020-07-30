import {graphql} from 'react-relay';
import {
  updateCertificationUrlMutation as updateCertificationUrlMutationType,
  updateCertificationUrlMutationVariables
} from 'updateCertificationUrlMutation.graphql';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateCertificationUrlMutation(
    $input: UpdateCertificationUrlInput!
  ) {
    updateCertificationUrl(input: $input) {
      certificationUrl {
        id
        certificationSignature
        certifiedBy
        certifiedAt
        formResultsMd5
      }
    }
  }
`;

const updateCertificationUrlMutation = async (
  environment: RelayModernEnvironment,
  variables: updateCertificationUrlMutationVariables
) => {
  const m = new BaseMutation<updateCertificationUrlMutationType>(
    'update-certification-url-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default updateCertificationUrlMutation;
