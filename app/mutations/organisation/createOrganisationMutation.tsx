import {graphql} from 'react-relay';
import {
  createOrganisationMutation as createOrganisationMutationType,
  createOrganisationMutationVariables
} from 'createOrganisationMutation.graphql';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createOrganisationMutation($input: CreateOrganisationInput!) {
    createOrganisation(input: $input) {
      organisation {
        id
        rowId
        operatorName
      }
      query {
        ...Organisations_query
      }
    }
  }
`;

const createOrganisationMutation = async (
  environment: RelayModernEnvironment,
  variables: createOrganisationMutationVariables
) => {
  const m = new BaseMutation<createOrganisationMutationType>(
    'create-organisation-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createOrganisationMutation;
