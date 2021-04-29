import {
  ConnectionHandler,
  graphql,
  DeclarativeMutationConfig
} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createApplicationRevisionStatusEdgeMutationVariables,
  createApplicationRevisionStatusEdgeMutation as createApplicationRevisionStatusEdgeMutationType
} from 'createApplicationRevisionStatusEdgeMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createApplicationRevisionStatusEdgeMutation(
    $input: CreateApplicationRevisionStatusInput!
    $connections: [ID!]!
  ) {
    createApplicationRevisionStatus(input: $input) {
      applicationRevisionStatusEdge @appendEdge(connections: $connections) {
        node {
          applicationRevisionStatus
          applicationRevisionByApplicationIdAndVersionNumber {
            applicationByApplicationId {
              applicationReviewStepsByApplicationId {
                edges {
                  node {
                    isComplete
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const createApplicationRevisionStatusEdgeMutation = async (
  environment: RelayModernEnvironment,
  variables: createApplicationRevisionStatusEdgeMutationVariables,
  applicationRevisionId: string,
  connectionKey: string
) => {
  const configs: DeclarativeMutationConfig[] = [
    {
      type: 'RANGE_ADD',
      parentID: applicationRevisionId,
      connectionInfo: [
        {
          key: connectionKey,
          rangeBehavior: 'append'
        }
      ],
      edgeName: 'applicationRevisionStatusEdge'
    }
  ];
  const m = new BaseMutation<createApplicationRevisionStatusEdgeMutationType>(
    'create-application-revision-status-mutation',
    configs
  );
  return m.performMutation(environment, mutation, {
    input: {...variables.input},
    connections: [
      ConnectionHandler.getConnectionID(applicationRevisionId, connectionKey)
    ]
  });
};

export default createApplicationRevisionStatusEdgeMutation;
export {mutation};
