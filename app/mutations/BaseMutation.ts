import {
  commitMutation as commitMutationDefault,
  GraphQLTaggedNode
} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {DeclarativeMutationConfig} from 'relay-runtime';

interface BaseMutationType {
  response: any;
  variables: {input: any};
}

export default class BaseMutation<T extends BaseMutationType = never> {
  counter: number;
  mutationName: string;
  configs?: DeclarativeMutationConfig[];
  constructor(mutationName: string, configs?: DeclarativeMutationConfig[]) {
    this.mutationName = mutationName;
    this.counter = 0;
    this.configs = configs;
  }

  async performMutation(
    environment: RelayModernEnvironment,
    mutation: GraphQLTaggedNode,
    variables: T['variables'],
    optimisticResponse?: any,
    updater?: any
  ) {
    const clientMutationId = `${this.mutationName}-${this.counter}`;
    variables.input.clientMutationId = clientMutationId;
    if (optimisticResponse) {
      const key = Object.keys(optimisticResponse)[0];
      optimisticResponse[key].clientMutationId = clientMutationId;
    }

    this.counter++;
    const {configs} = this;
    async function commitMutation(
      environment,
      options: {
        mutation: GraphQLTaggedNode;
        variables: T['variables'];
        optimisticResponse: any;
        updater: any;
      }
    ) {
      return new Promise<T['response']>((resolve, reject) => {
        commitMutationDefault<T>(environment, {
          ...options,
          configs,
          onError: error => {
            reject(error);
            console.log(error);
          },
          onCompleted: (response, errors) => {
            errors ? reject(errors) : resolve(response);
          }
        });
      });
    }

    return commitMutation(environment, {
      mutation,
      variables,
      optimisticResponse,
      updater
    });
  }
}
