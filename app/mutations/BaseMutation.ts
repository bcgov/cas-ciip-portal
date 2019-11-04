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

export default class BaseMutation<
  T extends BaseMutationType = BaseMutationType
> {
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
    variables: T['variables']
  ) {
    variables.input.clientMutationId = `${this.mutationName}-${this.counter}`;
    this.counter++;
    const {configs} = this;
    async function commitMutation(
      environment,
      options: {mutation: GraphQLTaggedNode; variables: T['variables']}
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

    return commitMutation(environment, {mutation, variables});
  }
}
