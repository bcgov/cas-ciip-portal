import {graphql, DeclarativeMutationConfig} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createNaicsCodeMutationMutationVariables,
  createNaicsCodeMutationMutation as createNaicsCodeMutationMutationType
} from 'createNaicsCodeMutationMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createNaicsCodeMutation($input: CreateNaicsCodeMutationInput!) {
    createNaicsCodeMutation(input: $input) {
      query {
        allNaicsCodes {
          edges {
            node {
              id
              naicsCode
            }
          }
        }
      }
    }
  }
`;

const createNaicsCodeMutation = async (
  environment: RelayModernEnvironment,
  variables: createNaicsCodeMutationMutationVariables
) => {
  const connectionKey = 'NaicsCodeTableContainer_allNaicsCodes';
  const configs: DeclarativeMutationConfig[] = [
    {
      type: 'RANGE_ADD',
      parentID: 'query',
      connectionInfo: [
        {
          key: connectionKey,
          rangeBehavior: 'append'
        }
      ],
      edgeName: 'naicsCodeEdge'
    }
  ];

  const m = new BaseMutation<createNaicsCodeMutationMutationType>(
    'create-naics_code-mutation',
    configs
  );
  return m.performMutation(environment, mutation, variables);
};

export default createNaicsCodeMutation;
