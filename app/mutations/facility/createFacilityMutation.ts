import {graphql} from 'react-relay';
import {
  createFacilityMutation as createFacilityMutationType,
  createFacilityMutationVariables
} from 'createFacilityMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createFacilityMutation($input: CreateFacilityInput!) {
    createFacility(input: $input) {
      facility {
        id
        facilityName
      }
      query {
        ...AddFacility_query
      }
    }
  }
`;

const createFacilityMutation = async (
  environment: RelayModernEnvironment,
  variables: createFacilityMutationVariables
) => {
  return new BaseMutation<createFacilityMutationType>(
    'create-facility-mutation'
  ).performMutation(environment, mutation, variables);
};

export default createFacilityMutation;
